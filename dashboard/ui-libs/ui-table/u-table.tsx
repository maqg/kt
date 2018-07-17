import * as React from "react";
import {MouseEvent, ReactElement, RefObject} from "react";
import {UCheck} from "..";

export interface UTableColumn {
    graph?: any,
    key: string,
    label: string,
    fill?: (value: any) => ReactElement<any>
}

export interface UTableProps {
    data: any[],
    column: UTableColumn[],
    onSelected?: (items: any[]) => void
}

export interface UTableRowProps {
    data: any,
    column: UTableColumn[],
    withCheck?:boolean,
    withIndex?:boolean,
    index: number,
    makeIndex: (index: number) => any
    onSelected?: (comp: UTableRow, item: any, check: boolean) => void
}
export interface UTableRowStates {
    selected: boolean,
    hover: boolean,
    down: boolean
}

export class UTableRow extends React.Component<UTableRowProps, UTableRowStates>{
    checkRef: RefObject<UCheck>;
    constructor(props: UTableRowProps) {
        super(props);
        this.state = {
            selected: false,
            hover: false,
            down: false
        };
        this.checkRef = React.createRef();
    }
    makeClassName() {
        let name=['u-table-row'];
        if(this.state.down) {
            name.push('down');
        }
        if(this.state.hover) {
            name.push('hover');
        }
        if(this.state.selected) {
            name.push('selected')
        }
        return name.join(' ');
    }
    onCheck(isCheck: boolean) {
        this.setState({
            selected: isCheck
        }, ()=>{
            if(this.props.onSelected) {
                this.props.onSelected(this, this.props.data, isCheck);
            }
        })
    }
    renderColumns():ReactElement<any> {
        return <>
            {this.props.withCheck && <td key={-2} className={'u-td-check'}><UCheck ref={this.checkRef} onCheck={(e)=>this.onCheck(e)}/></td>}
            {this.props.withIndex && <td key={-1} className={'u-td-index'}>{this.props.makeIndex?this.props.makeIndex(this.props.index):this.props.index}</td>}
            {this.props.column.map((c: UTableColumn, index: number) => {
                let value = this.props.data[c.key]?this.props.data[c.key]:"";
                if(c.fill) {
                    value = c.fill(value);
                }
                if(value) {
                    return <td key={index} className={'u-td'}>
                        {value}
                    </td>
                }
            })}
        </>
    }
    onTrClick(e: MouseEvent) {
        e.preventDefault();
        if(!this.props.withCheck){
            this.setState((pre)=>{
                return{selected:!pre.selected}
            }, ()=>{
                if(this.props.onSelected) {
                    this.props.onSelected(this, this.props.data, this.state.selected);
                }
            })
        }
    }
    onMouseEnter(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            hover: true
        })
    }
    onMouseLeave(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            hover: false,
            down: false
        })
    }
    onMouseDown(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            down: true
        })
    }
    onMouseUp(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            hover: true,
            down: false
        })
    }
    render() {
        return <tr className={this.makeClassName()} onClick={(e)=>this.onTrClick(e)} >
            {this.renderColumns()}
        </tr>
    }
}

export class UTable extends React.Component<UTableProps>{
    constructor(props: UTableProps) {
        super(props);
    }
    renderHead() {
        return <>
            {this.props.column.map((c: UTableColumn, index:number)=>{
                return <th key={'th-'+index}>
                    {c.graph && <span className={'graph'}>{c.graph}</span>}
                    {c.label && <span className={'label'}>{c.label}</span>}
                </th>
            })}
        </>
    }
    render(){
        return <table className={'u-table'}>
            <thead>
                <tr className={'u-tr-head'}>
                    {this.renderHead()}
                </tr>
            </thead>

            <tbody>

            </tbody>
        </table>
    }
}