import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  dataBase  from "../utilities/connection_data.js";
export const register = async(req, res) =>{
    try{
        const {
            is_smoker,
            chronic_diseases,
            email,
            password,
            user_fname,
            user_lname,
            age,
            sex,
            phone_number,
            picturepath
            
        } = req.body;
        // validate if data is empty
        console.log('Re');

        const userExistsQuery = `
            SELECT * FROM users
            WHERE email = $1;
        `;

        console.log('first');


        const user = await dataBase.query(userExistsQuery, [email]);
        console.log('second');


        if (user.rows.length > 0) {
            console.log('3');

            return res.status(400).json({ error: 'user already exists' });
        }

        
        console.log('4');
        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password, salt);
        console.log('5');

        const insertUserQuery = `
            INSERT INTO users (email, password, user_fname, user_lname, age,sex, phone_number, role, picturepath)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
        const userValues = [email, passwordHash, user_fname, user_lname, age, sex, phone_number, 'patient', picturepath ];
        const newUserResult = await dataBase.query(insertUserQuery, userValues);



        const insertPatientQuery = `
            INSERT INTO patient (patient_id, is_smoker,
            chronic_diseases)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const patient_id = newUserResult.rows[0].user_id;
        const patientValues = [patient_id,is_smoker, chronic_diseases];
        const newPatientResult = await dataBase.query(insertPatientQuery, patientValues);

        


        const token = jwt.sign({ id: patient_id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });


    } catch(err) {
        res.status(500).json({error: err.message});
    } finally {
        console.log('finally');
    }
}




export const login = async(req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        // validate if data is empty
        console.log('Received data:', { email, password }); 

        if (!email || !password ) {
            return res.status(400).json({ error: 'Email and password  are required' });
        }
        

            const userExistsQuery = `
                SELECT * FROM users
                WHERE email = $1;
            `;

            const user = await dataBase.query(userExistsQuery, [email]);
            console.log('user:', user.rows[0]);
            if (!user.rows[0]) {
                return res.status(400).json({ error: 'user not found' });
            }

            const storedPasswordHash = user.rows[0].password;
            const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            const token = jwt.sign({ id: user.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, user });
            
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}
