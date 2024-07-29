import dataBase from '../utilities/connection_data.js'
// controller for showing shifts of each doctor according to his id
export const getShiftsByDoctorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await dataBase.query('SELECT day, start_time, end_time FROM shifts WHERE doc_id = $1', [id]);
      // if no shifts found
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No shifts found.' });
      }
      // show the doctor shifts
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching shifts:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };



  // controller for showing the doctor's appointments by his id
  export const getAppointmentByDocId = async(req , res)=>{
    const {id} = req.params;

    try {
      const result = await dataBase.query('SELECT a.day_date, a.start_time, a.end_time, a.drug, l.test_name, l.comments, l.test_img, s.scan_name, s.comments, s.scan_img FROM appointments a JOIN scans s ON a.app_id = s.app_id_reference JOIN lab_results l ON a.app_id = l.app_id_reference WHERE a.doctor_id = $1' , [id] );
      //if no appointments are found
      if(result.rows.length === 0){
        return res.status(404).json({msg : 'No appointments are found'})
      }
      // show doctor appoinments
      return res.status(200).json(result.rows)
    } catch(error){
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }



  // controller for showing all patients supervised by the doctor (having upcoming appointments or had past appointments) using this doctor's id
  export const getSupervizedPatientsByDocId = async(req , res)=>{
      try{
    const {id} = req.params;
    const result = await dataBase.query('SELECT * FROM patient WHERE patient_id IN (SELECT patient_id FROM appointments WHERE doctor_id = $1)' , [id]);
    if(result.rows.length === 0){
      return res.status(404).send('No patients found under your supervision')
    }
    return res.status(200).json(result.rows);
    }
    
    catch(error){
      console.log(`Error fetching supervised patients: ${error}`);
      res.status(500).json({ message: 'Internal server error.'});
    }
  }
  
  

  // post shift request by doc_id
  export const requestShift = async(req , res)=>{
    try{
      const {id} = req.params;
      const { 
              day,
              start_time, 
              end_time,  
              req_start_time, 
              req_end_time
      } =req.body;

      // if current shift not found in the shifts
      const checkShift = await dataBase.query('SELECT * FROM shifts WHERE doc_id = $1 AND day = $2 AND start_time = $3 AND end_time = $4' , [id , day , start_time , end_time]);
      if(checkShift.rows.length === 0){
        return res.status(404).send('You have no shifts at this time.')
      }
      
      //if current shift is found to be requested before in the shift requests
      const checkRequest_curr = await dataBase.query('SELECT * FROM shift_req WHERE doc_id = $1 AND day = $2 AND start_time = $3 AND end_time = $4 ' , [id , day, start_time, end_time]);
      if(checkRequest_curr.rows.length != 0){
        return res.status(404).send('You already requested to change this current shift.')
      }

      //if the requested shift is found to be requested before in the shift requests
      const checkRequest_wanted = await dataBase.query('SELECT * FROM shift_req WHERE doc_id = $1 AND day = $2 AND req_start_time = $3 AND req_end_time = $4' , [id , day , req_start_time , req_end_time]);
      if(checkRequest_wanted.rows.length != 0){
        return res.status(404).send('You already requested this alternative shift.')
      }
      // insert the shift date you want to change and the date for the alternative shift .
      const shiftRequest = await dataBase.query('INSERT INTO shift_req (doc_id, day, start_time, end_time, req_start_time, req_end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *' , [id, day, start_time, end_time, req_start_time, req_end_time]);
      const newShiftRequest = shiftRequest.rows[0];

      // console.logging some fields of the new inserted shift request
      console.log({
        day: newShiftRequest.day,
        curr_start_time: newShiftRequest.start_time,
        curr_end_time: newShiftRequest.end_time,
        req_start_time: newShiftRequest.req_start_time,
        req_end_time: newShiftRequest.req_end_time,

      });

      // sending successfull insertion message
      res.status(200).send('Shift request added successfully.');
    }

    catch(error){
      console.log(`Error fetching shift requests: ${error}`);
      res.status(500).json({ message: 'Internal server error.'});
    }
  }

  
  // deleting shift request by doc_id
  export const deleteShiftRequest = async (req, res) => {
    try {
        const { id } = req.params; 
        const {
            day,
            start_time,
            end_time,
            req_start_time,
            req_end_time
        } = req.body;

        // Check if the shift request exists
        const checkRequest = await dataBase.query(
            'SELECT * FROM shift_req WHERE doc_id = $1 AND day = $2 AND start_time = $3 AND end_time = $4  AND req_start_time = $5 AND req_end_time = $6' ,
            [id, day, start_time, end_time, req_start_time, req_end_time]
        );

        if (checkRequest.rows.length === 0) {
            return res.status(404).send('Shift request not found.');
        }

        // Delete the shift request
        const delete_req = await dataBase.query(
            'DELETE FROM shift_req WHERE doc_id = $1 AND day = $2 AND start_time = $3 AND end_time = $4 AND req_start_time = $5 AND req_end_time = $6 RETURNING *' ,
            [id, day, start_time, end_time, req_start_time, req_end_time]
        );

        // logging the deleted shift request in the console
        const deletedRequest = delete_req.rows[0];
        console.log({
          del_day: deletedRequest.day,
          del_curr_start_time: deletedRequest.start_time,
          del_curr_end_time: deletedRequest.end_time,
          del_req_start_time: deletedRequest.req_start_time,
          del_req_end_time: deletedRequest.req_end_time,
  
        });

        // sending a successful deletion message to the user
        res.status(200).send('Shift request deleted successfully.');
    } catch (error) {
        console.log(`Error deleting shift request: ${error}`);
        res.status(500).json({ message: 'Internal server error.' });
    }
}



// upload scans for each appointment after getting all appointments ( controller for getting appointments is already implemented)
export const postScansForEachApp = async(req , res)=>{
  try{
      const app_id = req.params.app_id;
      const {
        scan_name , 
        scan_price ,
        comments , 
        scan_img , 
        img_path

      } = req.body;
      
      console.log(scan_name , scan_price , comments , scan_img , img_path);
      // inserting the scan for the appointment by the appointment id 
      const insertScan_req = await dataBase.query(`UPDATE scans
                                                   SET  scan_name = $1,
                                                        scan_price = $2,
                                                        comments = $3,
                                                        scan_img = $4,
                                                        img_path = $5
                                                        WHERE app_id_reference = $6 
                                                        RETURNING * ` , [ scan_name, scan_price, comments, scan_img, img_path, app_id]);
      const insertedScan = insertScan_req.rows[0];

      // logging fields of the inserted scan in the console
      console.log({
        inserted_app : insertedScan.app_id_reference,
        inserted_scan_name: insertedScan.scan_name ,
        inserted_scan_price: insertedScan.scan_price ,
        inserted_comments: insertedScan.comments , 
        inserted_scan_img: insertedScan.scan_img , 
        inserted_img_path: insertedScan.img_path
      });

      //successful insertion message
      res.status(200).json({msg: `scan inserted successfully for appointment ${app_id}`});

  }
  catch(error){
    console.log(`Error inserting scan: ${error}`);
        res.status(500).json({ message: 'Internal server error.' });
  }
}



//uploading lab tests for each appointment
export const postLabResForEachApp = async(req , res)=>{
  try{
      const app_id = req.params.app_id;
      const {
        test_name , 
        test_price ,
        comments , 
        test_img , 
        img_path

      } = req.body;

      // inserting the lab test for the appointment by the appointment id 
      const insertLabRes_req = await dataBase.query(`UPDATE lab_results
                                                    SET  test_name = $1,
                                                        test_price = $2,
                                                        comments = $3,
                                                        test_img = $4,
                                                        img_path = $5
                                                    WHERE app_id_reference = $6 
                                                     RETURNING * ` , [ test_name, test_price, comments, test_img, img_path, app_id]);
      const insertedLabRes = insertLabRes_req.rows[0];

      // logging fields of the inserted test in the console
      console.log({
        inserted_app : insertedLabRes.app_id_reference,
        inserted_test_name: insertedLabRes.test_name ,
        inserted_test_price: insertedLabRes.test_price ,
        inserted_comments: insertedLabRes.comments , 
        inserted_test_img: insertedLabRes.test_img , 
        inserted_img_path: insertedLabRes.img_path
      });

      //successful insertion message
      res.status(200).json({msg: `test inserted successfully for appointment ${app_id}`});

  }
  catch(error){
    console.log(`Error inserting lab test: ${error}`);
        res.status(500).json({ message: 'Internal server error.' });
  }
}