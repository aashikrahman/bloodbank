import db from "../config/db.js";

const fetchData = async (req, res) => {
  const getData = "SELECT * FROM  users ";

  try {
    const [result] = await db.promise().query(getData);
    console.log("wroking");
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

export default fetchData;
