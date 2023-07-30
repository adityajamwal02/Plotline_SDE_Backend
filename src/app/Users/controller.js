const userRepository = require('./repository')

// Sign Up

exports.createSignIn = async (req, res) => {
    try{
        const { name, email, password, confirmPassword } = req.body;
        // Check for Password match
        if (password !== confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }
        // Check for User Already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user with hashed password using bcrypt
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });
        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
}

// Login

exports.createLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Create a JWT token for user authentication
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {  // Used Secret Key via .env file
            expiresIn: '1h', // Token will expire in 1 hour
        });

        res.status(200).json({ message: 'Login successful', token });
    }catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};