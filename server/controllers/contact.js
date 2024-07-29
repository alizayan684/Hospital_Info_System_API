import  dataBase  from "../utilities/connection_data.js";
// add contact data in the form by the patient
export const saveContactData = async (req, res) => {
  try{
    const {patient_id} = req.params;
    const{
      fname, 
      lname, 
      email, 
      message
    } = req.body;
    console.log(req.body);
    // check entered user info
    const checkUserInfo = await dataBase.query('SELECT * FROM users WHERE user_id= $1 AND email = $2 AND user_fname = $3 AND user_lname = $4' , [patient_id , email , fname , lname]);
    if(checkUserInfo.rows.length === 0){
      return res.status(404).send("incorrect email, fname or lname");
    }

    const addcontactmessage = await dataBase.query('INSERT INTO patient_contact_form (patient_id, fname, lname, email, message) VALUES ($1, $2, $3, $4, $5) RETURNING * ', [patient_id, fname, lname, email, message]);
    res.json({ message: 'Contact form submitted successfully' });
  }catch(err){
    return res.status(400).json({ message: 'Invalid data' });
  }
};


//  getting all contact messages sent to the admin showing fname, lname, email of the sender and the message sent in the form
export const getContactData = async (req, res) => {
  try {
      const contactForm = await dataBase.query('SELECT fname , lname , email , message FROM patient_contact_form');
      res.status(200).json(contactForm.rows);
  } catch (error) {
      console.error('Error fetching contact form:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
}
