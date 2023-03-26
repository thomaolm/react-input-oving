import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService } from './services';
import { createHashHistory } from 'history';

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>
        {' ' /* Add extra space between menu items */}
        <NavLink to="/studentProgram" activeStyle={{ color: 'darkblue' }}>
          StudentProgram
        </NavLink>
        {' ' /* Add extra space between menu items */}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Welcome to StudAdm</div>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map((student) => (
          <li key={student.id}>
            <NavLink to={`/students/${student.id}/edit`}>{student.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudentEdit extends Component {
  student = null;

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.student[name] = value;
  };

  render() {
    if (!this.student) return null;

    return (
      <div>
        Name:{' '}
        <input type="text" name="name" value={this.student.name} onChange={this.handleChange} />
        Email:{' '}
        <input type="email" name="email" value={this.student.email} onChange={this.handleChange} />
        <div>
          <select
            name="studentprogram_id"
            value={this.student.studentprogram_id}
            onChange={this.handleChange}
          >
            <option value="1">Digfor</option>
            <option value="2">ØKAD</option>
          </select>
          <button type="button" onClick={this.save}>
            Save
          </button>
        </div>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });

    studentService.getStudyPrograms((studyprograms) => {
      this.studyprograms = studyprograms;
    });

    studentService.getStudyProgramForStudent(this.props.match.params.id, (studyprogram) => {
      this.studyprogram = studyprogram;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      this.props.history.push('/students');
    });
  }
}

class StudyProgramList extends Component {
  studyprograms = [];

  render() {
    return (
      <ul>
        {this.studyprograms.map((studyprogram) => (
          <li key={studyprogram.id}>
            <NavLink to={`/studentProgram/${studyprogram.id}/edit`}>{studyprogram.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService.getStudyPrograms((studyprograms) => {
      this.studyprograms = studyprograms;
    });
  }
}

class StudyProgramEdit extends Component {
  studyprogram = null;
  students = [];

  render() {
    if (!this.studyprogram) return null;

    return (
      <div>
        Name:{' '}
        <input
          type="text"
          value={this.studyprogram.name}
          onChange={(event) => (this.studyprogram.name = event.currentTarget.value)}
        />
        <button type="button" onClick={this.save}>
          Save
        </button>
        <ul>
          {this.students.map((student) => (
            <li key={student.id}> {student.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  mounted() {
    studentService.getStudyProgram(this.props.match.params.id, (studyprogram) => {
      this.studyprogram = studyprogram;
    });
    studentService.getStudentsForStudyProgram(this.props.match.params.id, (students) => {
      this.students = students;
    });
  }

  save() {
    studentService.updateStudyProgram(this.studyprogram, () => {
      this.props.history.push('/studentProgram');
    });
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/students" component={StudentList} />
    <Route path="/students/:id/edit" component={StudentEdit} />
    <Route exact path="/studentProgram" component={StudyProgramList} />
    <Route path="/studentProgram/:id/edit" component={StudyProgramEdit} />
  </HashRouter>
);
