import db from '../dataBaseConfig.js'

class getController {
  async getAreas(req, res) {
    try {
      db.query('SELECT * FROM elevator_company.area', (err, data) => {
        if (err) return res.status(400).json(err)
        return res.json(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getStreets(req, res) {
    try {
      db.query('SELECT * FROM elevator_company.street', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getApplications(req, res) {
    try {
      if (req.user.role === 2) {
        db.query(
          `SELECT address from elevator_company.user WHERE id='${req.user.id}'`,
          (err, data) => {
            if (err) return res.json(err)
            db.query(
              `SELECT settlers_application.id, settlers_application.start_date,settlers_application.type,settlers_application.breaking,settlers_application.description,settlers_application.status FROM elevator_company.settlers_application
            JOIN application on settlers_application.id=application.id
            join user on application.applicant=user.id
            WHERE user.address='${data[0].address}'`,
              (err, data) => {
                if (err) return res.json(err)
                return res.json(data)
              }
            )
          }
        )
      } else
        db.query(
          'SELECT * FROM elevator_company.manager_application',
          (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
          }
        )
    } catch (error) {
      console.log(error)
    }
  }
  async getEmployees(req, res) {
    try {
      if (req.user.role === 2)
        db.query(
          `SELECT address FROM elevator_company.user WHERE id=${req.user.id}`,
          (err, data) => {
            if (err) return res.json(err)
            db.query(
              `SELECT group_employees.application_number,employee.* FROM elevator_company.group_employees
          join employee on employee.personnel_number=group_employees.personnel_number
          join application on group_employees.application_number=application.id
          join user on user.id=application.applicant
          WHERE user.address=${data[0].address}`,
              (err, data) => {
                if (err) return res.json(err)
                return res.json(data)
              }
            )
          }
        )
      else
        db.query(
          `SELECT group_employees.application_number,employee.* FROM elevator_company.group_employees
          join employee on employee.personnel_number=group_employees.personnel_number
          join application on group_employees.application_number=application.id`,
          (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
          }
        )
    } catch (error) {
      console.log(error)
    }
  }
  async getType(req, res) {
    try {
      db.query(
        'SELECT * FROM elevator_company.application_type',
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getStatus(req, res) {
    try {
      db.query(
        'SELECT * FROM elevator_company.application_status',
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getBreaking(req, res) {
    try {
      db.query('SELECT * FROM elevator_company.breaking_type', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getElevator(req, res) {
    try {
      db.query(
        'SELECT * FROM elevator_company.elevator_with_address_view',
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getAllEmployees(req, res) {
    try {
      db.query(
        'SELECT employee.personnel_number, employee.surname, employee.patronymic, post.name as post, employee.name FROM elevator_company.employee JOIN post on employee.post=post.id',
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getPost(req, res) {
    db.query('SELECT * FROM elevator_company.post', (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json(data)
    })
  }
  async getUsers(req, res) {
    try {
      db.query(
        'SELECT id, login, name, surname, patronymic, address FROM elevator_company.user',
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getManufacturer(req, res) {
    try {
      db.query(
        `SELECT id, name FROM elevator_company.manufacturer WHERE type='${req.query.type}'`,
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getManufacturerType(req, res) {
    try {
      db.query(
        'SELECT * FROM elevator_company.type_manufacturer',
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getAddress(req, res) {
    try {
      db.query('SELECT * FROM elevator_company.address_view', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getElevatorType(req, res) {
    try {
      db.query('SELECT * FROM elevator_company.elevator_type', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getFeature(req, res) {
    try {
      db.query('SELECT * FROM elevator_company.features_type', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getPart(req, res) {
    try {
      db.query(
        'SELECT part.id, part.manufacturer, part.name, manufacturer.name as manufacturer_name FROM elevator_company.part join manufacturer on manufacturer.id=part.manufacturer',
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getUserAddress(req, res) {
    try {
      db.query(
        'SELECT * FROM elevator_company.address_view WHERE id=?',
        [req.query.address],
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getPartView(req, res) {
    try {
      db.query(
        'SELECT * FROM elevator_company.part_view WHERE application_number=?',
        [req.query.id],
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getEmployeeView(req, res) {
    try {
      db.query('SELECT * FROM elevator_company.employee_view', (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getUser(req, res) {
    try {
      db.query(
        `SELECT * FROM elevator_company.user WHERE id='${req.user.id}'`,
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getAddressNumber(req, res) {
    try {
      db.query(
        'SELECT * FROM elevator_company.address WHERE id=?',
        [req.query.address],
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  async getFilterApplications(req, res) {
    try {
      db.query(
        'SELECT * FROM elevator_company.manager_application WHERE status=? and start_date BETWEEN ? and ?',
        [
          req.query.status,
          `${req.query.start_date.replace(/-0/, '-')} 0:0:0`,
          `${req.query.finish_date.replace(/-0/, '-')} 0:0:0`,
        ],
        (err, data) => {
          if (err) return res.json(err)
          return res.json(data)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export default new getController()
