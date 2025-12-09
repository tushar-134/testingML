// Create Test User for Quick Login
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// Create Test User for Quick Login
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Youth from './models/Youth.js';
import dotenv from 'dotenv';

dotenv.config();

const createTestUser = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected!');

        // Use environment variables or defaults for test user
        const testMobile = process.env.TEST_USER_MOBILE || '9999999999';
        const testPassword = process.env.TEST_USER_PASSWORD || 'TestUser123';

        // Check if user already exists
        const existing = await Youth.findOne({ mobile: testMobile });

        if (existing) {
            console.log('⚠️  Test user already exists!');
            console.log('   Mobile:', testMobile);
            console.log('   You can login with this user.');
        } else {
            // Create new test user
            const hashedPassword = await bcrypt.hash(testPassword, 10);

            const testUser = await Youth.create({
                mobile: testMobile,
                password: hashedPassword,
                fullname: 'Demo User',
                email: 'demo@example.com',
                skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
                qualification: 'B.Tech Computer Science',
                experienceList: [
                    {
                        company: 'Tech Solutions Inc',
                        role: 'Software Developer',
                        duration: '1 year',
                        description: 'Developed web applications using modern technologies'
                    }
                ]
            });

            console.log('✅ TEST USER CREATED!');
            console.log('   Mobile:', testMobile);
            console.log('   Password:', testPassword);
            console.log('   User ID:', testUser._id);
            console.log('\n📝 To customize, set environment variables:');
            console.log('   TEST_USER_MOBILE=<mobile>');
            console.log('   TEST_USER_PASSWORD=<password>');
        }

        await mongoose.disconnect();
        console.log('✅ Done!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createTestUser();
