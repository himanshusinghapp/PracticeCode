const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Mock database (for demo purposes)
const existingUsers = [{ email: 'test@example.com' }];

// 1. Validate user input
function validateUserInput(user) {
  if (!user || !user.name || !user.email || !user.password) {
    throw new Error('Invalid input: Name, email, and password are required');
  }
}

// 2. Check if email already exists
function checkEmailExists(email) {
  return existingUsers.some(u => u.email === email);
}

// 3. Hash the password
async function hashPassword(password, saltRounds = 10) {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error(`Password hashing failed: ${error.message}`);
  }
}

// 4. Save user to database (mock)
function saveUserToDatabase({ name, email, hashedPassword }) {
  const newUser = { name, email, password: hashedPassword };
  // Simulate saving to DB
  existingUsers.push(newUser); // For demo; replace with real DB logic
  return newUser;
}

// 5. Send confirmation email
async function sendConfirmationEmail(email) {
  // Use environment variables for credentials (never hardcode)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password', // Use app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || 'your-email@gmail.com',
    to: email,
    subject: 'Welcome!',
    text: 'Thank you for registering!',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return `Email sent: ${info.response}`;
  } catch (error) {
    throw new Error(`Email failed: ${error.message}`);
  }
}

// 6. Main register user function
async function registerUser(user) {
  try {
    // Validate input
    validateUserInput(user);

    // Check if email exists
    if (checkEmailExists(user.email)) {
      throw new Error('Email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(user.password);

    // Save user
    const savedUser = saveUserToDatabase({
      name: user.name,
      email: user.email,
      hashedPassword,
    });

    // Send email
    const emailResult = await sendConfirmationEmail(user.email);

    console.log('User registered successfully:', savedUser);
    console.log(emailResult);

    return savedUser;
  } catch (error) {
    console.error('Registration failed:', error.message);
    throw error; // Let the caller handle it
  }
}

// Example usage
(async () => {
  try {
    await registerUser({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'securepassword',
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
})();