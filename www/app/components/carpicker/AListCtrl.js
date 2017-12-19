import React, { Component } from 'react';
import { Row, Col } from 'antd';
import classnames from "classnames";
import {connect} from "dva";
 

class AListCtrl extends Component {
    constructor(props) {
        super();
        this.state = {
            showMore: false,
        }
    }

    clickHandler(item) {
        this.props.addtag(this.props.tagname, item, item);
    }

    render() {
        //全局数据中它的值
        var _filter = this.props.filter.filter((item) => {
            return item.tagname == this.props.tagname;
        })[0];

        if (_filter) { var value = _filter.value };

        if (!this.props.data) return <div></div>   //这里是因为第一次render里面没有数据，第二次才有，可以做成loading
        return (
            <div className="a_list_ctrl_box">
                <Row>
                    <Col span={22}>
                        {
                            //把special里面的枚举成a标签
                            this.props.data.special.map((item, index) => {
                                return <a
                                    key={index}
                                    href="javascript:void(0);"
                                    onClick={() => { this.clickHandler(item) }}
                                    className={classnames({ "cur": item == value })}
                                >{item}</a>
                            })
                        }
                    </Col>
                    <Col span={2}>
                        <a href="javascript:void(0);" onClick={() => { this.setState({ "showMore": !this.state.showMore }) }}>更多</a>
                    </Col>
                </Row>
                
                  <Row>
                     <Col span={22}>
                         <div className="more_box" style={{ "display": this.state.showMore ? "block" : "none" }}>
                             {
                                 //更多,利用Object.keys把all里面的属性传入数组
                                Object.keys(this.props.data.all).map((item, index) => {
                                    return <dl key={index}>
                                        <dt>{item}</dt>
                                        <dd>
                                            {
                                                this.props.data.all[item].map((item, index) => {
                                                    return <a
                                                        key={index}
                                                        href="javascript:void(0);"
                                                        onClick={() => { this.clickHandler(item) }}
                                                        className={classnames({ "cur": item == this.state.value })}
                                                    >{item}</a>
                                                })
                                            }
                                        </dd>
                                    </dl>
                                })
                            }
                        </div>
                    </Col>
                </Row> 
            </div>
        )
    }
}
export default connect(
    ({ carpicker }) => ({
        filter: carpicker.filter
    })
)(AListCtrl);