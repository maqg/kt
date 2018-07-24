import * as React from "react";
import {UButton, UNumber} from "..";
import {UIcon} from "../ui-icon";

export interface UPagerProps {
    page?:number,
    limit: number,
    total: number,
    onChange: (page: number) => void
}

export interface UPagerStates {
    page: number, //from 0
    jumpPage: number //from 1
}

export class UPager extends React.Component<UPagerProps, UPagerStates>{
    constructor(props: UPagerProps) {
        super(props);
        this.state = {
            page: this.props.page?this.props.page: 0,
            jumpPage: null,
        }
    }
    private getPageSize(): number{
        return Math.ceil(this.props.total / this.props.limit);
    }
    private topPage() {
        this.setState({
            page: 0
        }, ()=>{
            this.props.onChange && this.props.onChange(0);
        })
    }
    private bottomPage() {
        this.setState({
            page: (this.getPageSize() - 1)
        }, ()=>{
            this.props.onChange && this.props.onChange(this.getPageSize() - 1);
        })
    }
    private jumpPage() {
        this.setState({
            page: this.state.jumpPage - 1
        }, ()=>{
            this.props.onChange && this.props.onChange(this.state.page);
        })
    }
    private prePage() {
        this.setState((pre)=>{
            return {page: (pre.page - 1)}
        }, () => {
            this.props.onChange && this.props.onChange(this.state.page);
        })
    }
    private nexPage() {
        this.setState((pre)=>{
            return {page: (pre.page + 1)}
        }, ()=>{
            this.props.onChange && this.props.onChange(this.state.page);
        })
    }
    render() {
        let pageSize = this.getPageSize();

        return <div className={'u-pager'}>
            <UButton graph={<UIcon iconName={'angle-double-left'}/>} disabled={this.state.page <= 0} title={'首页'} onClick={()=>this.topPage()}/>
            <UButton graph={<UIcon iconName={'angle-left'}/>} disabled={this.state.page <= 0} title={'上一页'} onClick={()=>this.prePage()}/>
            <span className={'page-index'}>
                <span className={'current'}>{this.state.page + 1}</span>
                <span className={'slash'}>/</span>
                <span className={'total'}>{pageSize}</span>
            </span>
            <UButton graph={<UIcon iconName={'angle-right'}/>} disabled={(this.state.page + 1) >= pageSize} title={'下一页'} onClick={()=>this.nexPage()}/>
            <UButton graph={<UIcon iconName={'angle-double-right'}/>} disabled={(this.state.page + 1) >= pageSize} title={'尾页'} onClick={()=>this.bottomPage()}/>
            <span className={'page-jump'}>
                <UNumber label={'跳转'} onChange={(num) => {console.log(num);this.setState({jumpPage: num})}}/>
                <UButton graph={<UIcon iconName={'step-forward'}/>}
                         disabled={!(this.state.jumpPage && this.state.jumpPage > 0 && this.state.jumpPage <= pageSize)}
                         onClick={()=>this.jumpPage()}
                         title={'跳转'}/>
            </span>
        </div>
    }
}