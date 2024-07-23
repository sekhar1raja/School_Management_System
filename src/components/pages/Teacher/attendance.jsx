import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Student extends Component {
    getStyle = () => {
        return {
            backgroundColor: this.props.student.present ? '#49B66E' : '#fff',
            color: this.props.student.present ? '#fff' : '#3b3b3b'
        }
    }

    render() {
        const { id, name } = this.props.student;

        return (
            <div style={this.getStyle()} className="contain">
                <table>
                    <tr>
                        <td>{id}</td>
                        <td className="nameCol">{name}</td>
                        <td className="switchCol">
                            {this.props.student.present ? 'Present ' : 'Absent '}
                            <label className="switch">
                                <input type="checkbox" onChange={this.props.studentPresent.bind(this, id)} defaultChecked={this.props.student.present} />
                                <span className="slider round"></span>
                            </label>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

// Prop types
Student.propTypes = {
    student: PropTypes.object.isRequired,
    studentPresent: PropTypes.func.isRequired
}

class Class extends Component {
    state = {
        students: [
            { id: 1, name: 'John Doe', present: true },
            { id: 2, name: 'Jane Smith', present: false },
            { id: 3, name: 'Sam Johnson', present: true }
        ]
    }

    studentPresent = (id) => {
        this.setState({
            students: this.state.students.map(student => {
                if (student.id === id) {
                    student.present = !student.present;
                }
                return student;
            })
        });
    }

    render() {
        return this.state.students.map((student) => (
            <Student key={student.id} student={student} studentPresent={this.studentPresent} />
        ));
    }
}

// Prop types
Class.propTypes = {
    students: PropTypes.array.isRequired,
    studentPresent: PropTypes.func.isRequired
}

export default Class;
