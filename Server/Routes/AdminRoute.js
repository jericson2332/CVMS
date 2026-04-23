import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bycrypt, { hash } from 'bcrypt'




// ------
//For windows Directory
const router = express.Router()

// ✅ Get the current directory name
router.post('/login', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query Error" });

        if (result.length > 0) {
            const email = result[0].email;
            const name = result[0].name;
            const token = jwt.sign(
                { role: "admin", email: email, name: name },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );
            res.cookie('token', token);
            return res.json({
                loginStatus: true,
                name: name,
                token: token
            });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

// BACKEND REDIRECT TO SUBS PAGE //
router.post('/subslogin',(req, res) => {
    const sql = "SELECT * from subscriber Where email = ? and password = ?"
    con.query(sql,[req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({loginStatus: false, Error: "Query Error"});
        if(result.length > 0){
            const email = result[0].email;
            const token = jwt.sign({role: "subscriber", email: email}, "jwt_secret_key",  { expiresIn: "1d"});
            res.cookie('token', token)
            return res.json({loginStatus: true });
        } else {
            return res.json({loginStatus: false, Error: "wrong email or password"});
        }
    })
})

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql,(err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// ADD SUBSCRIBER BACKEND
router.post('/add_subscriber', (req, res) => {
    const {
        created_at,
        name,
        email,
        password,
        address,
        plan,
        landmark,
        contactnumber,
        contractnumber,
        napnumber,
        portsequence,
        meters,
        category_id
    } = req.body;

    if (!name || !email || !password || !address || !category_id) {
        return res.status(400).json({ Status: false, Error: "Name, Email, Password, Address, and Category are required." });
    }

    bycrypt.hash(password.toString(), 10, (err, hash) => {
        if (err) return res.status(500).json({ Status: false, Error: "Password hashing failed" });

        const sql = `
            INSERT INTO subscriber 
            (created_at, name, email, password, address, plan, landmark, contactnumber, contractnumber, napnumber, portsequence, meters, category_id) 
            VALUES (?)`;

        const values = [
            created_at,
            name,
            email,
            hash,
            address,
            plan,
            landmark || null,
            contactnumber || null,
            contractnumber || null,
            napnumber || null,
            portsequence || null,
            meters || null,
            category_id
        ];

        con.query(sql, [values], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ Status: false, Error: "Email already exists" });
                }
                return res.status(500).json({ Status: false, Error: err.sqlMessage });
            }
            return res.json({ Status: true, Message: "Subscriber added successfully" });
        });
    });
});
// END ADD SUBSCRIBER BACKEND

router.get('/subscriber', (req, res) => {
    const sql = "SELECT * FROM subscriber";
    con.query(sql,  (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

// SUBSCRIBER BACKEND
router.get('/subscriber/:id', (req, res)=> {
    const id = req.params.id;
    const sql = "SELECT * FROM subscriber WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_subscriber/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE subscriber 
        SET status = ?, name = ?, email = ?, password = ?, address = ?, plan = ?, landmark = ?, contactnumber = ?,
        contractnumber = ?, napnumber = ?, portsequence = ?, meters = ?, remark = ?, category_id = ?, created_at = ?
        WHERE id = ?`; 

    const values = [
        req.body.status,
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.address,
        req.body.plan,
        req.body.landmark,
        req.body.contactnumber,
        req.body.contractnumber,
        req.body.napnumber,
        req.body.portsequence,
        req.body.meters,
        req.body.remark,
        req.body.category_id,
        req.body.created_at
    ];

    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error " + err });
        return res.json({ Status: true, Result: result });
    });
})

router.delete("/delete_subscriber/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM subscriber WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});

// ------------FOR ANALYTICS-------------
router.get("/subscribers_growth", (req, res) => {
    const sql = `
        SELECT 
            DATE_FORMAT(created_at, '%b') AS month,
            SUM(CASE WHEN category_id = 1 THEN 1 ELSE 0 END) AS cable_only,
            SUM(CASE WHEN category_id = 2 THEN 1 ELSE 0 END) AS cable_internet
        FROM subscriber
        GROUP BY MONTH(created_at)
        ORDER BY MONTH(created_at);
    `;

    con.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Status: false, Error: err.sqlMessage });
        return res.json({ Status: true, Result: result });
    });
})

// Subscribers Growth by Year (Latest Year Only)
router.get("/subscribers_growth_yearly", (req, res) => {
    const sql = `
        SELECT 
            YEAR(created_at) AS year,
            SUM(CASE WHEN category_id = 1 THEN 1 ELSE 0 END) AS cable_only,
            SUM(CASE WHEN category_id = 2 THEN 1 ELSE 0 END) AS cable_internet
        FROM subscriber
        WHERE YEAR(created_at) = (SELECT MAX(YEAR(created_at)) FROM subscriber)
        GROUP BY YEAR(created_at)
        ORDER BY YEAR(created_at);
    `;
    con.query(sql, (err, result) => {
        if (err) return res.status(500).json({ Status: false, Error: err.sqlMessage });
        return res.json({ Status: true, Result: result });
    });
});

// --------------------------


// FOR NEW APPLICATION
router.post('/new_application', (req, res) => {
    const {
    category,
    surname,
    firstname,
    middlename,
    dateofbirth,
    placeofbirth,
    gender,
    civilstatus,
    mothermaidenname,
    email,
    billingadd,
    address,
    landmark,
    homenumber,
    mobilenumber,
    employername,
    employeraddress,
    officenumber,
    occupation
  } = req.body;

   // ✅ Insert query
  const sql = `
    INSERT INTO newapplication (
      category, surname, firstname, middlename, dateofbirth, placeofbirth, gender,
      civilstatus, mothermaidenname, email, billingadd, address, landmark, homenumber, 
      mobilenumber, employername, employeraddress, officenumber, occupation
    ) VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  con.query(sql, [
    category, surname, firstname, middlename, dateofbirth, placeofbirth,
    gender, civilstatus, mothermaidenname, email, billingadd, address, landmark,
    homenumber, mobilenumber, employername, employeraddress,
    officenumber, occupation
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: "Database error" });
    }
    return res.json({ Status: true, Message: "New application added successfully" });
  });
});

router.get('/application', (req, res) => {
    const sql = "SELECT * FROM newapplication";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.get("/application/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM newapplication WHERE id = ?"; // adjust table name

  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: err });
    }
    if (result.length > 0) {
      return res.json({ Status: true, Result: result[0] });
    } else {
      return res.json({ Status: false, Message: "Application not found" });
    }
  });
});

router.delete('/delete_newapplication/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM newapplication WHERE id = ?";
    
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: " + err.sqlMessage });
        
        if (result.affectedRows === 0) {
            return res.json({ Status: false, Message: "No record found with that ID" });
        }

        return res.json({ Status: true, Message: "Record deleted successfully" });
    });
});

// PUT /auth/application/:id/seen pede ko to idelete
router.put("/application/:id/seen", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE newapplication SET seen = 1, seen_at = NOW() WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});
// END OF NEW APPLLICATION




// COUNT BACK END //
router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/subscableinternet_count', (req, res) => {
    {/**const sql = "select count(id) as subscriber from subscriber" */}
const sql = `
    SELECT category_id, COUNT(*) AS subscriber
    FROM subscriber
    WHERE category_id IN (2)
    GROUP BY category_id`;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/subsCableOnly_count', (req, res) => {
    {/**const sql = "select count(id) as subscriber from subscriber" */}
const sql = `
    SELECT category_id, COUNT(*) AS subscriber
    FROM subscriber
    WHERE category_id IN (1)
    GROUP BY category_id`;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// END OF COUNT

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

//ADMIN CLEAR CACHE//
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})


router.get('/admin_profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        const adminId = decoded.id;

        // Fetch admin details from DB
        const sql = "SELECT name FROM admin WHERE id = ?";
        con.query(sql, [adminId], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error' });

            if (result.length === 0) return res.status(404).json({ message: 'Admin not found' });

            res.json({ name: result[0].name }); // ✅ send the name
        });
    });
});


//USER CLEAR COOKIE//
router.get('/subslogout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})



// ----------FOR SUMMARY----- //
// 📌 Combined monthly summary endpoint

// router.get("/monthly_summary", (req, res) => {
//   const { month, year } = req.query;

//   // Default to current month/year if not provided
//   const selectedMonth = month ? Number(month) : new Date().getMonth() + 1;
//   const selectedYear = year ? Number(year) : new Date().getFullYear();

//   const sql = `
//     SELECT 'Install' AS type, id, name, address, plan, created_at
//     FROM subscriber
//     WHERE status = 'Active'
//       AND YEAR(created_at) = ?
//       AND MONTH(created_at) = ?
//     UNION ALL
//     SELECT 'Reconnect' AS type, id, name, address, plan, created_at
//     FROM subscriber
//     WHERE status = 'Reconnect'
//       AND YEAR(created_at) = ?
//       AND MONTH(created_at) = ?
//     UNION ALL
//     SELECT 'Disconnect' AS type, id, name, address, plan, created_at
//     FROM subscriber
//     WHERE status = 'Disconnect'
//       AND YEAR(created_at) = ?
//       AND MONTH(created_at) = ?
//     ORDER BY created_at DESC
//     LIMIT 150;
//   `;

//   con.query(
//     sql,
//     [selectedYear, selectedMonth, selectedYear, selectedMonth, selectedYear, selectedMonth],
//     (err, result) => {
//       if (err) return res.json({ Status: false, Error: err });
//       return res.json({ Status: true, Result: result });
//     }
//   );
// });


export {router as adminRouter}

