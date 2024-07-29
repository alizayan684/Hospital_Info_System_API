import e from 'express';
import dataBase from '../utilities/connection_data.js'
import bcrypt from "bcrypt";

export const getDashboard = async (req, res) => {
    try {
        const patients = await dataBase.query('SELECT COUNT(*) FROM patient');
        const doctors = await dataBase.query('SELECT COUNT(*) FROM doctor');
        const appointments = await dataBase.query('SELECT COUNT(*) FROM appointments');
        const equipments = await dataBase.query('SELECT COUNT(*) FROM equipment');
        res.status(200).json({
        patients: patients.rows[0].count,
        doctors: doctors.rows[0].count,
        appointments: appointments.rows[0].count,
        equipments: equipments.rows[0].count
        });
    } catch (error) {
        console.error('Error fetching dashboard:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAllPatients = async (req, res) => {
    try {
        const patients = await dataBase.query('SELECT * FROM patient');
        res.status(200).json(patients.rows);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getPatByID = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await dataBase.query('SELECT * FROM patient WHERE patient_id = $1', [id]);
        res.status(200).json(patient.rows[0]);
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAllEquipments = async (req, res) => {
    try {
        const equipments = await dataBase.query('SELECT * FROM equipment');
        res.status(200).json(equipments.rows);
    } catch (error) {
        console.error('Error fetching equipments:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const addEquipment = async (req, res) => {
    try {
        const {commercial_name,usage, manufacturer } = req.body;
        const newEquipment = await dataBase.query('INSERT INTO equipment ( commercial_name,usage,manufacturer) VALUES ($1, $2,$3) RETURNING *',
              [commercial_name,usage, manufacturer]);
        res.status(201).json(newEquipment.rows[0]);
    } catch (error) {
        console.error('Error adding equipment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const getEquByID = async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await dataBase.query('SELECT * FROM equipment WHERE ea_id = $1', [id]);
        res.status(200).json(equipment.rows[0]);
    } catch (error) {
        console.error('Error fetching equipment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const deleteEquByID = async (req, res) => {
    try {
        const { id } = req.params;
        await dataBase.query('DELETE FROM equipment WHERE ea_id = $1', [id]);
        res.status(200).json({ message: 'Equipment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting equipment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await dataBase.query('SELECT * FROM doctor JOIN users ON doctor.doctor_id = users.user_id');
        res.status(200).json(doctors.rows);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const registerDoctor = async (req, res) => {
    try {
        const {email,password, user_fname, user_lname,age, sex, phone_number, position, salary, specialization,picturepath } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await dataBase.query('INSERT INTO users (email,password, user_fname, user_lname,age, sex, phone_number, role,picturepath  ) VALUES ($1, $2, $3, $4,$5,$6,$7, $8,$9) RETURNING *',
              [email,passwordHash, user_fname, user_lname,age, sex, phone_number, 'doctor', picturepath]);
        const usrID = newUser.rows[0].user_id;
        const newDoctor = await dataBase.query('INSERT INTO doctor (doctor_id, position, salary, specialization) VALUES ($1, $2, $3, $4) RETURNING *',
              [usrID, position, salary, specialization]);
        res.status(201).json(newDoctor.rows[0]);
    } catch (error) {
        console.error('Error registering doctor:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getDocByID = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await dataBase.query('SELECT * FROM doctor JOIN users ON  doctor.doctor_id = users.user_id WHERE doctor.doctor_id =$1 ', [id]);
        res.status(200).json(doctor.rows[0]);
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const updateDocByID = async (req, res) => {
    try {
        const { id } = req.params;
        const {email,password, user_fname, user_lname,age, sex, phone_number, position, salary, specialization } = req.body;
        const updatedDoctor = await dataBase.query('UPDATE doctor SET position = $1, salary = $2, specialization = $3 WHERE doctor_id = $4 RETURNING *',
              [position, salary, specialization, id]);
        const updatedUser = await dataBase.query('UPDATE users SET email = $1, password = $2, user_fname = $3, user_lname = $4, age = $5, sex = $6, phone_number = $7 WHERE user_id = $8 RETURNING *',
              [email,password, user_fname, user_lname,age, sex, phone_number, id]);
        res.status(200).json(updatedDoctor.rows[0], updatedUser.rows[0]);
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const deleteDocByID = async (req, res) => {
    try {
        const { id } = req.params;
        await dataBase.query('DELETE FROM doctor WHERE doctor_id = $1', [id]);
        await dataBase.query('DELETE FROM users WHERE doctor_id = $1', [id]);
        res.status(200).json({ message: 'Doctor deleted successfully.' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await dataBase.query('SELECT * FROM appointments');
        res.status(200).json(appointments.rows);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const addAppointment = async (req, res) => { 
    try {
        const { doctor_id,patient_id,time_with_date,duration,drug,total_bill,app_id  } = req.body;
        const newAppointment = await dataBase.query('INSERT INTO appointments(doctor_id,patient_id,time_with_date,duration,drug,total_bill,app_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
              [ doctor_id,patient_id,time_with_date,duration,drug,total_bill,app_id]);
        res.status(201).json(newAppointment.rows[0]);
    } catch (error) {
        console.error('Error adding appointment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const updateApmntByID = async (req, res) => {
    try {
        const { id } = req.params;
        const {doctor_id,patient_id,start_time,end_time,day_date,drug,total_bill } = req.body;
        const updatedAppointment = await dataBase.query('UPDATE appointments SET doctor_id = $1, patient_id = $2, start_time = $3,end_time = $4 day_date = $5, drug = $6, total_bill = $7 WHERE app_id = $8 RETURNING *',
              [doctor_id,patient_id,start_time,end_time,day_date,drug,total_bill, id]);
        res.status(200).json(updatedAppointment.rows[0]);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const deleteApmntByID = async (req, res) => {
    try {
        const { id } = req.params;
        await dataBase.query('DELETE FROM appointments WHERE app_id = $1', [id]);
        res.status(200).json({ message: 'Appointment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

//Accept appointment request or reject by admin
export const acceptAppointmentReq = async (req, res) => {
    try {
        const{patient_fname,patient_lname,doctor_fname,doctor_lname,request_date} = req.body;
        // get the patient and doctor id from the database
        const patient_id = await dataBase.query('SELECT patient_id FROM patient WHERE patient_fname = $1 AND patient_lname = $2', [patient_fname,patient_lname]);
        const doctor_id = await dataBase.query('SELECT doctor_id FROM doctor WHERE doctor_fname = $1 AND doctor_lname = $2', [doctor_fname,doctor_lname]);
        const newAppointment = await dataBase.query('INSERT INTO appointment_request(patient_fname,patient_lname,doctor_fname,doctor_lname,request_date,patient_id,doctor_id) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *',
              [patient_fname,patient_lname,doctor_fname,doctor_lname,request_date,patient_id,doctor_id]);
        res.status(201).json(newAppointment.rows[0]);
    } catch (error) {
        console.error('Error updating appointment request:', error);s
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const getAllShifts = async (req, res) => {
    try{
        const shifts = await dataBase.query(`
            SELECT
                doctor.doctor_id,
                users.user_fname || ' ' || users.user_lname AS doctor_name,
                array_agg(shifts.start_time || ' - ' || shifts.end_time || ' - ' || shifts.day) AS shifts
            FROM
                shifts
                    RIGHT OUTER JOIN 
                doctor ON shifts.doc_id = doctor.doctor_id
                    JOIN
                users ON doctor.doctor_id = users.user_id
            GROUP BY
                (doctor.doctor_id, users.user_fname, users.user_lname)
        `);
        res.status(200).json(shifts.rows);
    } catch (error) {
        console.error('Error fetching shifts:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const getAllShiftRequests = async (req, res) => {
    try{
        const shiftRequests = await dataBase.query(`
            SELECT
                doctor.doctor_id, shift_req.start_time, shift_req.end_time, shift_req.day, shift_req.req_start_time, shift_req.req_end_time,
                users.user_fname || ' ' || users.user_lname AS doctor_name
            FROM
                shift_req
                    JOIN 
                doctor ON shift_req.doc_id = doctor.doctor_id
                    JOIN
                users ON doctor.doctor_id = users.user_id
        `);
        res.status(200).json(shiftRequests.rows);
    } catch (error) {
        console.error('Error fetching shiftRequests:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const addShift = async (req, res) => {
    try {
        const { doc_id } = req.params;
        const _days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        for (let day of _days) {
            const startTime = req.body.days[day].start || null;
            const endTime = req.body.days[day].end || null
            await dataBase.query('DELETE FROM shifts WHERE doc_id = $1 AND day = $2', [doc_id, day]);
            const newShift = await dataBase.query('INSERT INTO shifts(doc_id, start_time, end_time, day) VALUES ($1, $2, $3, $4) RETURNING *',
              [doc_id, startTime, endTime, day]);
        }
        res.status(201);
    } catch (error) {
        console.error('Error adding shift:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const registerAdmin = async (req, res) => {
    try {
        const {email,password, user_fname, user_lname, age, sex, phone_number,picturepath,salary, rank} = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await dataBase.query('INSERT INTO users (email,password, user_fname, user_lname,age, sex, phone_number, role,picturepath  ) VALUES ($1, $2, $3, $4,$5,$6,$7, $8,$9) RETURNING *',
              [email,passwordHash, user_fname, user_lname,age, sex, phone_number,'admin',picturepath]);
        const usrID = newUser.rows[0].user_id;
        const newAdmin = await dataBase.query('INSERT INTO admin (admin_id, salary, rank) VALUES ($1, $2, $3) RETURNING *',
              [usrID, salary, rank]);
        res.status(201).json(newAdmin.rows[0]);
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}