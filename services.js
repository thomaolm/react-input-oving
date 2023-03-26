import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getStudyPrograms(success) {
    pool.query('SELECT * FROM Studieprogram', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudyProgram(id, success) {
    pool.query('SELECT * FROM Studieprogram WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=?, studentprogram_id=? WHERE id=?',
      [student.name, student.email, student.studentprogram_id, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  updateStudyProgram(studyProgram, success) {
    pool.query(
      'UPDATE Studieprogram SET name=? WHERE id=?',
      [studyProgram.name, studyProgram.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  getStudyProgramForStudent(id, success) {
    pool.query('SELECT * FROM Studieprogram WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getStudentsForStudyProgram(id, success) {
    pool.query('SELECT * FROM Students WHERE studentprogram_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let studentService = new StudentService();
