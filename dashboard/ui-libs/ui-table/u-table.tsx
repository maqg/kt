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
    selected:boolean,
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

    componentWillReceiveProps(nextProps: Readonly<UTableRowProps>, nextContext: any): void {
        if(nextProps.selected !== this.props.selected) {
            // console.log(nextProps.data.name,'checked:',nextProps.selected);
            this.setState({
                selected: nextProps.selected
            })
        }
    }

    getUniqueID() {
        // console.log(getRowDataUniqueID(this.props.column, this.props.data, this.props.index));
        return getRowDataUniqueID(this.props.column, this.props.data, this.props.index);
    }
    makeClassName() {
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
    // check by checkbox
    onCheck(isCheck: boolean) {
        this.setState({
            selected: isCheck
        }, ()=>{
            if(this.props.onSelected) {
                this.props.onSelected(this.getUniqueID(), isCheck);
            }
        })
    }
    renderColumns():ReactElement<any> {
        return <>
            {this.props.withCheck && <td key={-2} className={'u-td-check'}><UCheck ref={this.checkRef} checked={this.state.selected} onCheck={(e)=>this.onCheck(e)}/></td>}
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
    //check by row click
    onTrClick(e: MouseEvent) {
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
        return <tr className={this.makeClassName()}  >
            {this.renderColumns()}
        </tr>
    }
}

export interface UTableStates {
    selected: string[]
}
export interface UTableProps {
    data: any[],
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
            selected: []
        }
    }
    renderHead() {
        return <>
            {this.props.column.map((c: UTableColumn, index:number)=>{
                return <th key={'th-'+index}>
                    {typeof c.header === 'function' && c.header(c)}
                    {typeof c.header !== 'function' && c.header}
                </th>
            })}
        </>
    }
    onCheck(e: boolean){
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
                    this.props.onSelected(this.props.data);
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
    findRowByUniID(uniID: string): RefObject<UTableRow> {
        return this.rows.find((value: RefObject<UTableRow>) => {
            return value.current.getUniqueID() === uniID;
        });
    }
    findDataByUniID(uniID: string): any{
        return this.props.data.find((value: any, index: number)=>{
            return uniID === this.getUniIDbyItem(value, index);
        });
    }
    rowSelect(uniID: string, check: boolean){
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
    getUniIDbyItem(item: any, index:number){
        return getRowDataUniqueID(this.props.column, item, index);
    }
    reMapSelected(items: any[]) {
        let newSelected: string[] = [];
        this.state.selected.map((selectedID: string)=>{
           let matchIndex = items.findIndex((item: any, index: number) => {
               return selectedID === this.getUniIDbyItem(item, index);
           });
           if(matchIndex >= 0) {
               newSelected.push(selectedID);
           }
        });
        this.setState({selected: newSelected});
    }
    componentWillReceiveProps(nextProps: Readonly<UTableProps>, nextContext: any): void {
        if(nextProps.data !== this.props.data) {
            this.reMapSelected(nextProps.data);
        }
    }
    checkRowInSelected(data: any, index: number):boolean {
        let rowDataUniID = this.getUniIDbyItem(data, index);
        return this.state.selected.findIndex((selectedID: string) => {
            return selectedID === rowDataUniID;
        }) >= 0;
    }
    getSelectedData(){
        let selectedData: any[] = [];
        this.state.selected.map((id: string) => {
            let data = this.findDataByUniID(id);
            if(!!data) selectedData.push(data);
        });
        return selectedData;
    }
    renderBody() {
        this.rows = [];
        // console.log("update row items");
        this.props.data.map((data: any, index: number)=>{
            this.rows[index] = React.createRef();
        });
        return <>
            {this.props.data && this.props.data.map((data: any, index: number) => {
                return <UTableRow
                    ref={this.rows[index]}
                    withIndex={this.props.withIndex}
                    makeIndex={this.props.makeIndex}
                    withCheck={this.props.withCheck}
                    key={index}
                    data={data}
                    onSelected={(uniID: string, check: boolean)=>this.rowSelect(uniID, check)}
                    column={this.props.column}
                    index={index} selected={this.checkRowInSelected(data, index)}/>
            })}
        </>
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