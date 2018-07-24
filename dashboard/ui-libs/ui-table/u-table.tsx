import * as React from "react";
import {MouseEvent, ReactElement, RefObject} from "react";
import {UCheck} from "..";
import {Base64} from "js-base64";

export interface UTableColumn {
    header: ((c:UTableColumn)=>any) | any,
    key: string,
    primary?:boolean,
    unSelectable?: boolean,
    fill?: (value: any, data: any, c:UTableColumn) => ReactElement<any>
}
export interface UTableRowProps {
    data: any,
    column: UTableColumn[],
    withCheck?:boolean,
    withIndex?:boolean,
    index: number,
    makeIndex?: (index: number) => any,
    onSelected?: (uniID: string, check: boolean) => void
}
export interface UTableRowStates {
    selected: boolean,
    hover: boolean,
    down: boolean
}
function getRowDataUniqueID(columns:UTableColumn[], data:any, index: number){
    let prime: UTableColumn[] = [];
    columns.map((c: UTableColumn)=>{
        if(c.primary) prime.push(c);
    });
    if(prime.length === 0) {
        return Base64.encode(index+"");
    } else {
        let ret:{[key: string]:string} = {};
        columns.map((c: UTableColumn) => {
            ret[c.key] =data[c.key] ? data[c.key] : "";
        });
        return Base64.encode(JSON.stringify(ret))
    }
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

    getUniqueID() {
        // console.log(getRowDataUniqueID(this.props.column, this.props.data, this.props.index));
        return getRowDataUniqueID(this.props.column, this.props.data, this.props.index);
    }
    setSelected(selected: boolean, notify?:boolean) {
        this.setState({
            selected: selected
        }, ()=>{
            if(this.props.onSelected && notify) {
                this.props.onSelected(this.getUniqueID(), selected);
            }
            if(this.checkRef.current){
                this.checkRef.current.setCheck(this.state.selected);
            }
        })
    }
    private makeClassName() {
        let name=['u-table-row'];
        if(this.state.down) {
            name.push('down');
        }
        if(this.props.index%2 === 0){
            name.push('even');
        } else {
            name.push('odd');
        }
        if(this.state.hover) {
            name.push('hover');
        }
        if(this.state.selected) {
            name.push('selected')
        }
        return name.join(' ');
    }
    private onCheck(isCheck: boolean) {
        this.setState({
            selected: isCheck
        }, ()=>{
            if(this.props.onSelected) {
                this.props.onSelected(this.getUniqueID(), isCheck);
            }
        })
    }
    private onTrClick(e: MouseEvent) {
        e.preventDefault();
        this.setState((pre)=>{
            return{selected:!pre.selected}
        }, ()=>{
            if(this.props.onSelected) {
                this.props.onSelected(this.getUniqueID(), this.state.selected);
            }
            if(this.checkRef.current){
                this.checkRef.current.setCheck(this.state.selected);
            }
        });
    }
    private onMouseEnter(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            hover: true
        })
    }
    private onMouseLeave(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            hover: false,
            down: false
        })
    }
    private onMouseDown(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            down: true
        })
    }
    private onMouseUp(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            hover: true,
            down: false
        })
    }
    private renderColumns():ReactElement<any> {
        return <>
            {this.props.withCheck && <td key={-2} className={'u-td-check'}><UCheck ref={this.checkRef} onCheck={(e)=>this.onCheck(e)}/></td>}
            {this.props.withIndex && <td key={-1} className={'u-td-index'} onClick={(e)=>this.onTrClick(e)}>{this.props.makeIndex?this.props.makeIndex(this.props.index):this.props.index}</td>}
            {this.props.column.map((c: UTableColumn, index: number) => {
                let value = this.props.data[c.key]?this.props.data[c.key]:"";
                if(c.fill) {
                    value = c.fill(value, this.props.data, c);
                }
                if(value) {
                    return <td key={index} className={'u-td'} onClick={(e)=>{if(!c.unSelectable)this.onTrClick(e)}}>
                        {value}
                    </td>
                }
            })}
        </>
    }
    render() {
        return <tr className={this.makeClassName()}
                   onMouseEnter={e=>this.onMouseEnter(e)}
                   onMouseLeave={e=>this.onMouseLeave(e)}
                   onMouseDown={e=>this.onMouseDown(e)}
                   onMouseUp={e=>this.onMouseUp(e)}>
            {this.renderColumns()}
        </tr>
    }
}

export interface UTableStates {
    selected: string[],
    data: any[]
}
export interface UTableProps {
    column: UTableColumn[],
    onSelected?: (items: any[]) => void,
    withHead ?:boolean,
    withCheck ?: boolean,
    withIndex ?: boolean,
    multi ?: boolean,
    makeIndex?:(index: number) => any
}
export class UTable extends React.Component<UTableProps, UTableStates>{
    rows:RefObject<UTableRow>[];
    checkAllRef: RefObject<UCheck>;
    constructor(props: UTableProps) {
        super(props);
        this.rows = [];
        this.checkAllRef = React.createRef();
        this.state = {
            selected: [],
            data: []
        }
    }
    setData(data: any[]) {
        this.setState({data: data}, ()=>{
            this.reMapSelected(data);
        })
    }
    getData(): any[]{
        return this.state.data;
    }
    private renderHead() {
        return <>
            {this.props.column.map((c: UTableColumn, index:number)=>{
                return <th key={'th-'+index}>
                    {typeof c.header === 'function' && c.header(c)}
                    {typeof c.header !== 'function' && c.header}
                </th>
            })}
        </>
    }
    private onCheck(e: boolean){
        if(e) {
            let newSelected: string[] = [];
            this.rows.map((rowRef: RefObject<UTableRow>) => {
               rowRef.current.setSelected(true);
               newSelected.push(rowRef.current.getUniqueID());
            });
            this.setState({
                selected: newSelected
            }, ()=>{
                if(this.props.onSelected) {
                    this.props.onSelected(this.state.data);
                }
            });

        } else {
            let newSelected: string[] = [];
            this.rows.map((rowRef: RefObject<UTableRow>)=>{
                rowRef.current.setSelected(false);
            });
            this.setState({
                selected: newSelected
            }, ()=>{
                if(this.props.onSelected) {
                    this.props.onSelected([])
                }
            });
        }
    }
    private findRowByUniID(uniID: string): RefObject<UTableRow> {
        return this.rows.find((value: RefObject<UTableRow>) => {
            return value.current.getUniqueID() === uniID;
        });
    }
    private findDataByUniID(uniID: string): any{
        return this.state.data.find((value: any, index: number)=>{
            return uniID === this.getUniIDbyItem(value, index);
        });
    }
    private rowSelect(uniID: string, check: boolean){
        let after = ()=>{
            if(this.props.onSelected) {
                let selectedData: any[] = [];
                this.state.selected.map((id: string) => {
                    let data = this.findDataByUniID(id);
                    if(!!data) selectedData.push(data);
                });
                // console.log(JSON.stringify(this.state.selected));
                this.props.onSelected(selectedData);
            }
        };
        if(check) {
            if(!this.props.multi && this.state.selected.length === 1){
                let rowNew = this.findRowByUniID(uniID);
                let rowOld = this.findRowByUniID(this.state.selected[0]);
                if(rowOld) {
                    rowOld.current.setSelected(false);
                }
                if(rowNew){
                    rowNew.current.setSelected(true);
                }
                this.setState({
                    selected: [uniID]
                }, ()=>after())
            } else {
                this.setState((pre)=>{
                    let newSelected = [...pre.selected];
                    newSelected.push(uniID);
                    return {
                        selected: newSelected
                    }
                }, ()=>after())
            }
        } else {
            this.setState((pre)=>{
                let newSelected = [...pre.selected];
                let rIndex = newSelected.indexOf(uniID);
                newSelected.splice(rIndex, 1);
                return {
                    selected: newSelected
                }
            }, ()=>after());
        }
    }
    private getUniIDbyItem(item: any, index:number){
        return getRowDataUniqueID(this.props.column, item, index);
    }
    private reMapSelected(items: any[]) {
        let newSelected: string[] = [];
        this.state.selected.map((selectedID: string)=>{
           let matchIndex = items.findIndex((item: any, index: number) => {
               return selectedID === this.getUniIDbyItem(item, index);
           });
           if(matchIndex >= 0) {
               newSelected.push(selectedID);
           }
        });
        this.rows.map((row: RefObject<UTableRow>) => {
            let rowID = row.current.getUniqueID();
            if(newSelected.findIndex((value: string) => {return value === rowID}) >= 0) {
                row.current.setSelected(true);
            } else {
                row.current.setSelected(false);
            }
        });
        this.setState({selected: newSelected}, ()=>{
            if(this.props.onSelected) {
                let selectedData: any[] = [];
                this.state.selected.map((id: string) => {
                    let data = this.findDataByUniID(id);
                    if(!!data) selectedData.push(data);
                });
                // console.log(JSON.stringify(this.state.selected));
                this.props.onSelected(selectedData);
            }
        });
    }

    private renderBody() {
        this.rows = [];
        this.state.data.map((data: any, index: number)=>{
            this.rows[index] = React.createRef();
        });
        return <>
            {this.state.data && this.state.data.map((data: any, index: number) => {
                return <UTableRow
                    ref={this.rows[index]}
                    withIndex={this.props.withIndex}
                    makeIndex={this.props.makeIndex}
                    withCheck={this.props.withCheck}
                    key={index}
                    data={data}
                    onSelected={(uniID: string, check: boolean)=>this.rowSelect(uniID, check)}
                    column={this.props.column}
                    index={index}/>
            })}
        </>
    }
    getSelectedData(){
        let selectedData: any[] = [];
        this.state.selected.map((id: string) => {
            let data = this.findDataByUniID(id);
            if(!!data) selectedData.push(data);
        });
        return selectedData;
    }

    render(){
        return <table className={'u-table'}>
            {this.props.withHead && <thead>
            <tr className={'u-tr-head'}>
                {this.props.withCheck && <td key={-2} className={'u-th-check'}><UCheck ref={this.checkAllRef} disabled={!this.props.multi} onCheck={(e)=>this.onCheck(e)}/></td>}
                {this.props.withIndex && <td key={-1} className={'u-th-index'}>#</td>}
                {this.renderHead()}
            </tr>
            </thead>}
            <tbody>
            {this.renderBody()}
            </tbody>
        </table>
    }
}