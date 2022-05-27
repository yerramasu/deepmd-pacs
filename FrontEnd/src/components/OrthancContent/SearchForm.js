import React, { Component } from 'react'
import Form from '../CommonComponents/SearchForm/Form'

export default class SearchForm extends Component{

    dataSearch = (formData) => {
         
        //dateForm
        let date = ""
        if (formData.dateFrom !== "" || formData.dateTo !== "") //if dateFrom or dateTo isn't empty 
            date = formData.dateFrom.replace('-', '').replace('-', '') + '-' + formData.dateTo.replace('-', '').replace('-', '')
        //patient name
        let patientName = ""
        if (formData.lastName !== '' && formData.firstName ==='')
            patientName = formData.lastName
        else if (formData.lastName === '' && formData.firstName !== '')
            patientName = '^' + formData.firstName
        else if (formData.lastName !== '' && formData.firstName !== '')
            patientName = formData.lastName + '^' + formData.firstName

        let contentSearch = {
            Level: 'Study',
            CaseSensitive: false,
            Expand: true, 
            Query: {
                PatientName: patientName, 
                PatientID: formData.patientID,
                AccessionNumber: formData.accessionNumber,
                StudyDate: date, 
                ModalitiesInStudy: formData.modalities,
                StudyDescription: formData.studyDescription
            }
        }

        //Call submit function to be handled by parent
        this.props.onSubmit(contentSearch)

    }

    //form
    render(){
        return (
            <Form title="Search" icone="fas fa-search" onFormValidate={this.dataSearch} >
                    <input type='button' className='btn otjs-button otjs-button-blue' value='Search' />
            </Form>
        )
    }
}
