import db from '../dataBaseConfig.js'
import bcrypt from 'bcryptjs'

class postController {
  async updateApplication(req, res) {
    try {
      let type, status, breaking
      db.query(
        `SELECT id FROM elevator_company.application_type WHERE name='${req.body.type}'`,
        (err, data) => {
          if (err) return res.json(err.sqlMessage)
          if (!data.length) return res.status(400).json('Не найден тип заявки')
          type = data[0].id
          db.query(
            `SELECT id FROM elevator_company.breaking_type WHERE name='${req.body.breaking}'`,
            (err, data) => {
              if (err) return res.json(err.sqlMessage)
              if (!data.length)
                return res.status(400).json('Не найдена поломка')
              breaking = data[0].id
              db.query(
                `SELECT id FROM elevator_company.application_status WHERE name='${req.body.status}'`,
                (err, data) => {
                  if (err) return res.json(err.sqlMessage)
                  if (!data.length)
                    return res.status(400).json('Не найден статус заявки')
                  status = data[0].id
                  if (req.body.elevator)
                    db.query(
                      `UPDATE elevator_company.application SET type='${type}', status='${status}', elevator='${req.body.elevator}', description='${req.body.description}', breaking='${breaking}' WHERE id='${req.body.id}'`,
                      (err, data) => {
                        if (err) return res.json(err.sqlMessage)
                        db.query(
                          `SELECT application_number FROM elevator_company.group_employees WHERE application_number='${req.body.id}'`,
                          (err, data) => {
                            if (err) return res.json(err.sqlMessage)
                            if (!data.length)
                              req.body.employees.forEach((emp) => {
                                db.query(
                                  `INSERT elevator_company.group_employees (application_number, personnel_number) values (?,?)`,
                                  [req.body.id, emp],
                                  (err, data) => {
                                    if (err) return res.json(err)
                                  }
                                )
                              })
                            return res
                              .status(200)
                              .json('Заявка была успешно обновлена!')
                          }
                        )
                      }
                    )
                  else
                    db.query(
                      `UPDATE elevator_company.application SET type='${type}', status='${status}', description='${req.body.description}', breaking='${breaking}' WHERE id='${req.body.id}'`,
                      (err, data) => {
                        if (err) return res.json(err.sqlMessage)
                        db.query(
                          `SELECT application_number FROM elevator_company.group_employees WHERE application_number='${req.body.id}'`,
                          (err, data) => {
                            if (err) return res.json(err.sqlMessage)
                            if (!data.length)
                              req.body.employees.forEach((emp) => {
                                db.query(
                                  `INSERT elevator_company.group_employees (application_number, personnel_number) values (?,?)`,
                                  [req.body.id, emp],
                                  (err, data) => {
                                    if (err) return res.json(err)
                                  }
                                )
                              })
                            return res
                              .status(200)
                              .json('Заявка была успешно обновлена!')
                          }
                        )
                      }
                    )
                }
              )
            }
          )
        }
      )
    } catch (error) {
      return res.status(500).json('Ошибка добавления')
    }
  }
  async newApplication(req, res) {
    try {
      if (req.user.role === 2)
        db.query(
          'INSERT elevator_company.application (type,description,status,applicant) values (?,?,?,?)',
          [1, req.body.description, 6, req.user.id],
          (err, data) => {
            if (err) {
              console.log(err)
              return res.json(err)
            }

            return res.status(200).json('Заявка была успешно добавлена!')
          }
        )
      else {
        let type, status, breaking
        if (
          !req.body.type ||
          !req.body.breaking ||
          !req.body.description ||
          !req.body.status ||
          !req.body.applicant ||
          !req.body.employees
        )
          return res.status(400).json('Недостаточно данных')
        db.query(
          `SELECT id FROM elevator_company.application_type WHERE name='${req.body.type}'`,
          (err, data) => {
            if (err) return res.json(err.sqlMessage)
            type = data[0].id
            db.query(
              `SELECT id FROM elevator_company.breaking_type WHERE name='${req.body.breaking}'`,
              (err, data) => {
                if (err) return res.json(err.sqlMessage)
                breaking = data[0].id
                db.query(
                  `SELECT id FROM elevator_company.application_status WHERE name='${req.body.status}'`,
                  (err, data) => {
                    if (err) return res.json(err.sqlMessage)
                    status = data[0].id
                    db.query(
                      `INSERT elevator_company.application (type,description,status,applicant,breaking) values (?,?,?,?,?)`,
                      [
                        type,
                        req.body.description,
                        status,
                        req.body.applicant,
                        breaking,
                      ],
                      (err, data) => {
                        if (err) return res.json(err.sqlMessage)
                        db.query(
                          `SELECT MAX(id) from elevator_company.application`,
                          (err, data) => {
                            if (err) return res.json(err.sqlMessage)

                            req.body.employees.forEach((emp) => {
                              db.query(
                                `INSERT elevator_company.group_employees (application_number, personnel_number) values (?,?)`,
                                [data[0]['MAX(id)'], emp],
                                (err, data) => {
                                  if (err) return res.json(err)
                                }
                              )
                            })
                            return res
                              .status(200)
                              .json('Заявка была успешно добавлена!')
                          }
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        )
      }
    } catch (error) {
      return res.status(400).json(error)
    }
  }
  async newStreet(req, res) {
    db.query(
      'INSERT elevator_company.street (name) values (?)',
      [req.body.street],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Улица добавилась!')
      }
    )
  }
  async newRole(req, res) {
    db.query(
      'INSERT elevator_company.role (name) values (?)',
      [req.body.role],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Роль добавилась!')
      }
    )
  }
  async newPost(req, res) {
    db.query(
      'INSERT elevator_company.post (name) values (?)',
      [req.body.post],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Должность добавилась!')
      }
    )
  }
  async newManufacturerType(req, res) {
    db.query(
      'INSERT elevator_company.type_manufacturer (name) values (?)',
      [req.body.manufacturerType],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Тип производителя добавился!')
      }
    )
  }
  async newFeature(req, res) {
    db.query(
      'INSERT elevator_company.features_type (name) values (?)',
      [req.body.feature],
      (err, data) => {
        if (err) return res.json(err.sqlMessage)
        return res.status(200).json('Характеристика добавилась!')
      }
    )
  }
  async newElevatorType(req, res) {
    db.query(
      'INSERT elevator_company.elevator_type (name) values (?)',
      [req.body.elevatorType],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Тип лифта добавился!')
      }
    )
  }
  async newBreaking(req, res) {
    db.query(
      'INSERT elevator_company.breaking_type (name) values (?)',
      [req.body.breaking],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Поломка добавилась!')
      }
    )
  }
  async newArea(req, res) {
    db.query(
      'INSERT elevator_company.area (name) values (?)',
      [req.body.area],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Район добавился!')
      }
    )
  }
  async newApplicationStatus(req, res) {
    db.query(
      'INSERT elevator_company.application_status (name) values (?)',
      [req.body.status],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Статус заявки добавился!')
      }
    )
  }
  async newApplicationType(req, res) {
    db.query(
      'INSERT elevator_company.application_type (name) values (?)',
      [req.body.applicationType],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Тип заявки добавился!')
      }
    )
  }
  async newEmployee(req, res) {
    db.query(
      'INSERT elevator_company.employee (surname, name, patronymic, post) values (?,?,?,?)',
      [req.body.surname, req.body.name, req.body.patronymic, req.body.post],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Рабочий добавился!')
      }
    )
  }
  async newManufacturer(req, res) {
    db.query(
      'INSERT elevator_company.manufacturer (name, type) values (?,?)',
      [req.body.name, req.body.type],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Прозводитель добавился!')
      }
    )
  }
  async newPart(req, res) {
    db.query(
      'INSERT elevator_company.part (name, manufacturer) values (?,?)',
      [req.body.name, req.body.manufacturer],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Деталь добавилась!')
      }
    )
  }
  async newAddress(req, res) {
    db.query(
      'INSERT elevator_company.address (area, street, house, entrance) values (?,?,?,?)',
      [req.body.area, req.body.street, req.body.house, req.body.entrance],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Адрес добавился!')
      }
    )
  }
  async newElevator(req, res) {
    db.query(
      'INSERT elevator_company.elevator_pasport (serial_number, production_year, manufacturer, address, type) values (?,?,?,?,?)',
      [
        req.body.serialNumber,
        req.body.productionYear,
        req.body.manufacturer,
        req.body.address,
        req.body.elevatorType,
      ],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Лифт добавился!')
      }
    )
  }
  async newElevatorFeature(req, res) {
    db.query(
      'INSERT elevator_company.features_list (serial_number, feature_type, value) values (?,?,?)',
      [req.body.elevator, req.body.feature, req.body.value],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Характеристика добавилась!')
      }
    )
  }
  async newElevatorPart(req, res) {
    db.query(
      'INSERT elevator_company.parts_list (application_number, part, quantity) values (?,?,?)',
      [req.body.appicationId, req.body.partId, req.body.qty],
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Деталь добавилась!')
      }
    )
  }
  async updateElevatorAddress(req, res) {
    db.query(
      `UPDATE elevator_company.elevator_pasport set address='${req.body.address}' where serial_number='${req.body.id}'`,
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Адрес изменен!')
      }
    )
  }
  async deleteElevator(req, res) {
    db.query(
      `DELETE FROM elevator_company.elevator_pasport WHERE serial_number='${req.body.id}'`,
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Лифт удален!')
      }
    )
  }
  async deletePartElevator(req, res) {
    db.query(
      `DELETE FROM elevator_company.parts_list WHERE id='${req.body.id}'`,
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Деталь откреплена от лифта!')
      }
    )
  }
  async updatePartElevator(req, res) {
    db.query(
      `UPDATE elevator_company.parts_list SET quantity='${req.body.qty}' WHERE id='${req.body.id}'`,
      (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('Деталь изменена!')
      }
    )
  }
  async updateUser(req, res) {
    try {
      db.query(
        `SELECT id, login, password, role FROM elevator_company.user WHERE id='${req.user.id}'`,
        (err, data) => {
          if (err) return res.status(400).json(err)
          const validPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
          )
          if (!validPassword)
            return res.status(400).json('Введен неверный пароль')
          db.query(
            `SELECT id from address where area='${req.body.area}' and street='${req.body.street}' and house='${req.body.house}' and entrance='${req.body.entrance}';`,
            (err, data) => {
              if (err) return res.json(err)
              if (data.length == 0)
                return res.status(400).json('Выбран некорректный адрес')
              db.query(
                `UPDATE elevator_company.user SET login='${req.body.login}', surname='${req.body.surname}', name='${req.body.name}', patronymic='${req.body.patronymic}', apartment='${req.body.apartment}', phone_number='${req.body.phoneNumber}', address='${data[0].id}' WHERE id='${req.user.id}'`,
                (err, data) => {
                  if (err) return res.json(err.sqlMessage)
                  return res
                    .status(200)
                    .json('Пользователь был успешно обновлен!')
                }
              )
            }
          )
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export default new postController()
