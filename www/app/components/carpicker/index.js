import React from "react";
import classnames from "classnames";
import { connect } from "dva";

 

//引入我们的控件组件
import TabCtrl from "./TabCtrl.js";
import AListCtrl from "./AListCtrl.js";
import RangeCtrl from "./RangeCtrl.js";
import MultipleSelectCtrl from "./MultipleSelectCtrl.js";
import SelectCtrl from "./SelectCtrl.js";
//引入标签组件
import Tags from "./Tags.js";
//引入表格组件
import MyTable from "./MyTable.js";
import '../../styles/less_carpicker.less'

 
class CarPicker extends React.Component {
    constructor({fetchInit , fetchInit2}) {
        super();
        this.state = {
            "brand" : ""
        }
        fetchInit2();
        //拉取默认数据
        fetchInit();
    }
    //换品牌
    changebrand(brand){
        this.setState({
            brand
        })
    }

    //增加tag
    addtag(tagname,value,words) {
        this.props.addtag(tagname, value, words);
    }

    render() {
		var series = {};
		if(this.props.details[0]){
			var {carbrands,biansuxiang , cartype , color , engine , km , paifang , price , seat } = this.props.details[0];
			series = this.props.details[0].series;
		}
        return <div>
            <div className="ant-table">
                <div className="ant-table-body">
                    <table>
                        <tbody className="ant-table-tbody">
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    品牌
                                </td>
                                <td>
                                    <TabCtrl 
										data={this.props.details[0] && this.props.details[0].carbrands
										} 
                                        tagname="品牌" 
                                        addtag={this.addtag.bind(this)}
                                        changebrand={this.changebrand.bind(this)}
                                    >
									{
									this.props.details[0] &&this.props.details[0].carbrands	
									}
									</TabCtrl>
                                </td>
                            </tr>
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    车系
                                </td>
                                <td>
									<AListCtrl 
										data={series[this.state.brand]}
										tagname="车系" 
									 	addtag={this.addtag.bind(this)}
									>
									 </AListCtrl>
                                </td>
                            </tr>
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    价格
                                </td>
                                <td>
                                    <RangeCtrl data={price} tagname="价格" addtag={this.addtag.bind(this)}
									value={[0,100]}
									></RangeCtrl>
                                </td>
                            </tr>
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    公里数
                                </td>
                                <td>
                                    <RangeCtrl data={km} tagname="公里数" addtag={this.addtag.bind(this)}
									value={[0,1000000]}
									></RangeCtrl>
                                </td>
                            </tr>
                            <tr className="ant-table-row">
                                <td className="td_h">
                                    其他
                                </td>
                                <td>
                                    <MultipleSelectCtrl 
                                        data={cartype} 
                                        tagname="车型" 
                                        addtag={this.addtag.bind(this)}
                                    ></MultipleSelectCtrl>
                                    {" "}
                                    <MultipleSelectCtrl 
                                        data={seat} 
                                        tagname="座位数"
                                        addtag={this.addtag.bind(this)}
                                     ></MultipleSelectCtrl>
                                    {" "}
                                    <SelectCtrl
                                        data={color}
                                        tagname="颜色"
                                        addtag={this.addtag.bind(this)}
                                    ></SelectCtrl>
                                    {" "}
                                    <MultipleSelectCtrl
                                        data={engine}
                                        tagname="发动机"
                                        addtag={this.addtag.bind(this)}
                                    ></MultipleSelectCtrl>
                                    {" "}
                                    <MultipleSelectCtrl
                                        data={paifang}
                                        tagname="排放"
                                        addtag={this.addtag.bind(this)}
                                    ></MultipleSelectCtrl>
                                      {" "}
                                     <SelectCtrl
                                        data={biansuxiang}
                                        tagname="变速箱"
                                        addtag={this.addtag.bind(this)}
                                    ></SelectCtrl>
                                    {" "}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
                    <br/>
                    
                    <Tags></Tags>

                    <br />
                    <br />
                </div>
            </div>

            <div className="cl"></div>

            <MyTable 
                changeXuanfu={this.props.changeXuanfu}
                changeChexing={this.props.changeChexing}
            ></MyTable>
        </div>
    }
}

export default connect(
    ({carpicker: {details}}) =>({
		details 
	}) ,
    (dispatch)=>({
        addtag(tagname,value, words){
            dispatch({ "type": "carpicker/addtag", value, tagname, words })
        },
        fetchInit(){
            dispatch({ "type": "carpicker/fetchInit"})
        },
        fetchInit2(){
            dispatch({ "type": "carpicker/fetchInit2"})
        }
    })
)(CarPicker);