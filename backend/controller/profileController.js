import db from "../config/db.js";

const profile = async (req, res) => {
  const { phone, address, is_healthy, blood_group } = req.body;

  const userId = req.user.userId;
  const userName = req.user.userName;
  const emailId = req.user.emailId;

  console.log(req.user);
  try {
    const insertData =
      "INSERT INTO donors(id, name ,phone,email,address,is_healthy,blood_group) VALUES (?,?,?,?,?,?,?)";

    await db
      .promise()
      .query(insertData, [
        userId,
        userName,
        phone,
        emailId,
        address,
        is_healthy,
        blood_group,
      ]);

    return res.status(201).json({ message: "Added Success" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Server Error" });
  }
};

export default profile;
