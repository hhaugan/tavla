import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import { SlideSwitch, Checkbox } from '@entur/component-library'
import SelectionPanelSearch from './searchPanels/SelectionPanelSearch.jsx'
import { getIcon } from '../../utils'
import './styles.scss'

const SelectionPanel = ({
    onCheck, updateHiddenList, stops, position, handleAddNewStop,
}) => (
    <div className="selection-panel">
        { (stops.length > 0)
            ? <div>
                <div className="search-stop-places">
                    <SelectionPanelSearch position={position} handleAddNewStop={handleAddNewStop}/>
                </div>
                <div className="stop-place-panel">
                    {<div className="stop-place-header">
                        <div className="selection-panel-title">Stoppesteder</div>
                    </div>}
                    {
                        stops.map(({
                            name, id, departures,
                        }, index) => {
                            const isChecked = !onCheck(id, 'stops')
                            return (
                                <Accordion className="selection-row" accordion="true" key={index}>
                                    <div className="checkbox-container">
                                        <Checkbox
                                            key={id}
                                            id={id}
                                            checked={isChecked}
                                            onChange={() => updateHiddenList(id, 'stops')}
                                            style={{
                                                borderRadius: '12px', height: '24px', width: '24px', cursor: 'pointer',
                                            }}
                                        />
                                    </div>
                                    <AccordionItem
                                        className="selection-data-wrapper"
                                        key={id}
                                    >
                                        <AccordionItemTitle className="selection-data-container stop-place-container">
                                            <div className="stop-place-title">
                                                {name}
                                            </div>
                                            <div className="show-button">
                                                <p className="show-button--text">Endre</p>
                                                <div className="accordion__arrow" role="presentation" />
                                            </div>
                                        </AccordionItemTitle>
                                        <div className="selection-data-wrapper--border" />
                                        <AccordionItemBody>
                                            <table className="admin-route-table">
                                                <tbody>
                                                    { departures.map(({ route, type }, i) => {
                                                        const isVisible = !onCheck(route, 'routes')
                                                        return (
                                                            <tr
                                                                className="admin-route-row"
                                                                key={i}
                                                            >
                                                                <td className="admin-route-icon">{getIcon(type, { width: 28, height: 28 })}</td>
                                                                <td className="admin-route-title">{route}</td>
                                                                <td>
                                                                    <SlideSwitch
                                                                        key={i}
                                                                        id="SlideSwitch"
                                                                        className="mode-sort-slide-switch-stops"
                                                                        onChange={() => { updateHiddenList(route, 'routes') }}
                                                                        checked={isVisible}
                                                                        style={{ cursor: 'pointer' }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) }
                                                </tbody>
                                            </table>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                </Accordion>
                            )
                        })
                    }
                </div>
            </div>
            : null }
    </div>
)

export default SelectionPanel
