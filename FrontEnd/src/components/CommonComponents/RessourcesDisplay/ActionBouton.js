import React, {Component, Fragment} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import apis from '../../../services/apis'

import OhifLink from '../../Viewers/OhifLink'
import StoneLink from '../../Viewers/StoneLink'
import Modal from 'react-bootstrap/Modal'
import Metadata from '../../Metadata/Metadata'
import Modify from '../../Modify/Modify'
import {toast} from 'react-toastify'
import CreateDicom from '../../CreateDicom/CreateDicom'

export default class ActionBouton extends Component {

    state = {
        showMetadata: false
    }

    static defaultProps = {
        hiddenMetadata: true,
        hiddenCreateDicom: false
    }

    setMetadata = () => {
        this.setState({
            showMetadata: !this.state.showMetadata
        })
    }

    delete = async () => {
        let orthancID = this.props.orthancID
        switch (this.props.level) {
            case 'patients':
                try {
                    await apis.content.deletePatient(orthancID)
                    toast.success("Patient " + orthancID + " have been deleted")
                    this.props.onDelete(orthancID, this.props.parentID)
                } catch (error) {
                    toast.error(error)
                }
                break
            case 'studies':
                try {
                    await apis.content.deleteStudies(orthancID)
                    toast.success("Studies " + orthancID + " have been deleted")
                    this.props.onDelete(orthancID, this.props.parentID)
                } catch (error) {
                    toast.error(error)
                }
                break
            case 'series':
                try {
                    await apis.content.deleteSeries(orthancID)
                    toast.success("Series " + orthancID + " have been deleted")
                    this.props.onDelete(orthancID, this.props.parentID)
                } catch (error) {
                    toast.error(error)
                }
                break
            default:
                toast.error("Wrong level")
        }

    }

    handleClick = (e) => {
        e.stopPropagation()
    }

    render = () => {
        return (
            <Fragment>
                {/*modal pour metadata*/}
                <Modal show={this.state.showMetadata} onHide={this.setMetadata} scrollable={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Metadata</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Metadata serieID={this.props.orthancID}/>
                    </Modal.Body> 
                </Modal>

                <Dropdown onClick={this.handleClick} drop='left' className="text-center">
                    <Dropdown.Toggle variant="button-dropdown-green" id="dropdown-basic" className="button-dropdown button-dropdown-green">
                        Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="mt-2 border border-dark border-2">
                        <OhifLink className='dropdown-item bg-green' {...this.props} />
                        {/* <StoneLink className='dropdown-item bg-green' {...this.props} /> */}
                        <button className='dropdown-item bg-green' type='button' onClick={this.setMetadata}
                                hidden={this.props.hiddenMetadata}>View Metadata
                        </button>
                        {(["patients", "studies"].includes(this.props.level) ? <CreateDicom {...this.props}/> :
                            null)}
                        <Modify hidden={this.props.hiddenModify} {...this.props} />
                        <button className='dropdown-item bg-red' type='button' hidden={this.props.hiddenDelete}
                                onClick={this.delete}>Delete
                        </button>
                        {(this.props.level === "studies" && !!this.props.openLabelModal ?
                            <button className='dropdown-item bg-blue' type='button' hidden={this.props.hiddenDelete}
                                    onClick={() => {
                                        apis.content.getStudiesDetails(this.props.orthancID).then((study) => {
                                            this.props.openLabelModal(study)
                                        })
                                    }}>Labels
                            </button> : null)}

                    </Dropdown.Menu>
                </Dropdown>
            </Fragment> 
        )
    }


}