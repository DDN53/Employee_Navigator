const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateTokens } = require("../tokenUtils");
const nodemailer = require("nodemailer");
const PasswordHistory = require("../models/Password");
const {
  Custom400Error,
  Custom401Error,
  Custom500Error,
} = require("../middleware/errorHandlingMiddleware");

const login = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const condition = /^\d+$/.test(username)
      ? { employeeNumber: username }
      : { email: username };

    const user = await User.findOne({
      where: condition,
    });

    if (!user) {
      throw new Custom401Error("Unauthorized: Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Custom401Error("Unauthorized: Invalid username or password");
    }

    const { accessToken } = generateTokens(user);

    const maxAge = 3 * 60 * 60;

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { employeeNumber } = req.body;

  try {
    const user = await User.findOne({ where: { employeeNumber } });

    if (!user) {
      throw new Custom400Error("Bad Request: User not found");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dinukanisheda9@gmail.com",
        pass: "elbu hxlj indb grpa",
      },
      secure: true,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const sendVerificationCode = async (email, code) => {
      const mailOptions = {
        from: "dinukanisheda9@gmail.com",
        to: email,
        subject: "**Verification Code**",
        html: `
          <div style="background-color: #1B4242; color: #ffffff; padding: 10px; border-radius: 5px;">
            <p style="font-weight: bold;">Your verification code is:</p>
            <p style="font-weight: bold; font-size: 16px; color: #ffffff;">${code}</p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);

      console.log("Email sent: " + info.response);
      return true;
    };

    const emailFirstLetter = user.email.split("@")[0].slice(0, 1);
    const emailLastLetter = user.email.split("@")[0].slice(-1);
    const emailDomain = user.email.split("@")[1];
    const hiddenEmail =
      emailFirstLetter + "********" + emailLastLetter + "@" + emailDomain;

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    user.verificationCode = verificationCode;

    sendVerificationCode(user.email, verificationCode)
      .then(async (success) => {
        if (success) {
          console.log("Verification code sent successfully!");
          const verificationCodeExpiration = new Date(
            Date.now() + 5 * 60 * 1000
          );
          user.verificationCodeExpiration = verificationCodeExpiration;
          await user.save();
          res.json({ data: { email: hiddenEmail } });
        } else {
          console.log("Failed to send verification code.");
          throw new Custom500Error("Failed to send verification code.");
        }
      });
  } catch (error) {
    next(error);
  }
};


async function submitVerificationCode(req, res,next) {
  const { employeeNumber, verificationCode } = req.body;

  try {
    const user = await User.findOne({
      where: { employeeNumber },
      include: [{ model: PasswordHistory, attributes: ["password"] }],
    });

    if (!user) {
      throw new Custom404Error("User not found");
    }

    if (
      user.verificationCode !== verificationCode ||
      user.verificationCodeExpiration.getTime() < new Date().getTime()
    ) {
      throw new Custom401Error("Invalid or expired verification code");
    }

    user.verificationCode = null;
    user.verificationCodeExpiration = null;
    await user.save();

    res.json({ message: "Verification code verified" });
  } catch (error) {
    
    next(error);
  }
}


async function resetPassword(req, res, next) {
  const { employeeNumber, password } = req.body;
console.log("reset password", employeeNumber, password);
  try {

    if (!password || typeof password !== "string") {
      throw new Custom400Error("Invalid or missing password in the request");
    }

    const user = await User.findOne({
      where: { employeeNumber },
      include: [{ model: PasswordHistory, attributes: ["password"] }],
    });

    if (!user) {
      throw new Custom404Error("User not found");
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);

    

    const passwordHistory = user.PasswordHistories.map(
      (pHistory) => pHistory.dataValues.password
    );

    const isPasswordUsedBefore = passwordHistory.some((oldPassword) =>
      bcrypt.compareSync(password, oldPassword)
    );

    if (isPasswordUsedBefore) {
      throw new Custom401Error(
        "New password cannot be one of the last passwords."
      );
    }

    user.password = hashedPassword;
    await user.save();
    await PasswordHistory.create({ password: hashedPassword, userId: user.id });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    next(error);
  }
}

module.exports = {
  login,
  logout,
  forgotPassword,
  resetPassword,
  submitVerificationCode,
};
