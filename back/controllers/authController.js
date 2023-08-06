import db from "../dataBaseConfig.js";
import bcrypt from "bcryptjs";
import obj from "../config.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, obj.secret, { expiresIn: "12h" });
};

class authController {
  async registration(req, res) {
    try {
      db.query(
        `SELECT login FROM elevator_company.user WHERE login='${req.body.login}'`,
        (err, data) => {
          if (err) return res.status(400).json(err);
          if (data.length)
            return res
              .status(400)
              .json("Пользователь с данным логином уже зарегистрирован");
          const {
            login,
            password,
            surname,
            name,
            phoneNumber,
            area,
            street,
            house,
            entrance,
            apartment,
            patronymic,
          } = req.body;
          if (!password) return res.status(400).json("Ошибка регистрации");
          const hashPassword = bcrypt.hashSync(password, 7);
          db.query(
            `SELECT id from elevator_company.address where area='${area}' and street='${street}' and house='${house}' and entrance='${entrance}'`,
            (err, data) => {
              if (err) return res.json(err);
              if (data.length == 0)
                return res.status(400).json("Выбран некорректный адрес");
              db.query(
                `INSERT elevator_company.user (login, password, role, surname, name, address, patronymic,phone_number, apartment) values (?, ?,?,?, ?, ?, ?, ?,?)`,
                [
                  login,
                  hashPassword,
                  2,
                  surname,
                  name,
                  data[0].id,
                  patronymic,
                  phoneNumber,
                  apartment,
                ],
                (err, data) => {
                  if (err) return res.json(err);
                  return res
                    .status(200)
                    .json("Пользователь был успешно зарегистрирован!");
                }
              );
            }
          );
        }
      );
    } catch (error) {
      return res.status(400).json("Ошибка регистрации");
    }
  }
  async login(req, res) {
    try {
      const { login, password } = req.body;
      db.query(
        `SELECT id, login, password, role FROM elevator_company.user WHERE login='${login}'`,
        (err, data) => {
          if (err) return res.status(400).json(err.message);
          if (!data.length)
            return res
              .status(400)
              .json("Пользователь с таким логином не был найден");
          const validPassword = bcrypt.compareSync(password, data[0].password);
          if (!validPassword)
            return res.status(400).json("Введен неверный пароль");
          const token = generateAccessToken(data[0].id, data[0].role);
          return res.status(200).json({ token, role: data[0].role });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  async checkAuth(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) return res.status(401).json("Пользователь не авторизован");
      jwt.verify(token, obj.secret);
      return res.status(200).json("Всё ок");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new authController();
