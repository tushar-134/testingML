// Test MongoDB Connection and Data
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testMongoDB = async () => {
    try {
        console.log('Testing MongoDB connection...');
        console.log('MONGO_URI:', process.env.MONGO_URI?.replace(/:[^:]*@/, ':****@')); // Hide password

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully!');

        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n📁 Available Collections:');
        collections.forEach(col => console.log(`  - ${col.name}`));

        // Check Youth collection
        const Youth = mongoose.model('Youth', new mongoose.Schema({}, { strict: false }));
        const count = await Youth.countDocuments();
        console.log(`\n👥 Total Youth Records: ${count}`);

        if (count > 0) {
            console.log('\n📋 Sample Records (latest 3):');
            const samples = await Youth.find().sort({ _id: -1 }).limit(3).lean();
            samples.forEach((record, index) => {
                console.log(`\n  Record ${index + 1}:`);
                console.log(`    Name: ${record.fullname}`);
                console.log(`    Mobile: ${record.mobile}`);
                console.log(`    Email: ${record.email}`);
                console.log(`    Gender: ${record.gender}`);
                console.log(`    Skills: ${record.skills?.join(', ') || 'None'}`);
                console.log(`    Created: ${record._id.getTimestamp()}`);
            });
        } else {
            console.log('\n⚠️  No records found in Youth collection');
        }

        await mongoose.disconnect();
        console.log('\n✅ Test Complete!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

testMongoDB();
