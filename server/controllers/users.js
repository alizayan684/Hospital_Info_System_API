import  dataBases from "../utilities/connection_data.js";
import bcrypt from "bcrypt";

//Edit user
export const editUser = async (req, res) => {

  const { id } = req.params;
  console.log(req.body)
  console.log("what reached controller from edit")
  const { user_fname, user_lname, email, phone_number ,oldPassword, newPassword } = req.body;
  try {

    if (oldPassword && newPassword) {

      const userExistsQuery = `
              SELECT * FROM users
              WHERE email = $1;
          `;

      const user = await dataBases.query(userExistsQuery, [email]);

      if (user.rows.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }

      const storedPasswordHash = user.rows[0].password;
      const isPasswordValid = await bcrypt.compare(oldPassword, storedPasswordHash);

      if (isPasswordValid) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);
        const user = await dataBases.query('UPDATE users SET password =$1 where user_id=$2', [passwordHash, id])
      }
    }

    const editedUser = await dataBases.query('UPDATE users SET user_fname = $1, user_lname = $2, age=$3, email=$4,phone_number=$5 WHERE user_id = $6  returning *',
      [user_fname, user_lname, age, email,phone_number, user_id]);
    res.json(editedUser.rows[0]);
    console.log("User has been updated successfully")


  } catch (err) {
    console.error(err.message);
    console.log('nonono');
    res.status(500).send('Server Error');
  }
}


//Get user by ID
export const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await dataBases.query('SELECT * FROM users WHERE user_id = $1', [id]);
    //find the user other data from other tables
    const roleQuery = `SELECT * FROM doctor WHERE doctor_id = $1;`;
    const roleQuery2 = `SELECT * FROM admin WHERE admin_id = $1;`;
    const roleQuery3 = `SELECT * FROM patient WHERE patient_id = $1;`;
    const doctor = await dataBases.query(roleQuery, [id]);
    const admin = await dataBases.query(roleQuery2, [id]);
    const patient = await dataBases.query(roleQuery3, [id]);
    if (doctor.rows.length > 0) {
      return res.status(200).json({ doctor: doctor.rows[0], user: user.rows[0] });
    } else if (admin.rows.length > 0) {
      return res.status(200).json({ admin: admin.rows[0], user: user.rows[0] });
    } else if (patient.rows.length > 0) {
      return res.status(200).json({ patient: patient.rows[0], user: user.rows[0] });
    } else {
      res.json(user.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(501).send('error ');
  }
}




