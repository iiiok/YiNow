import React, { Component } from 'react';
import { Carousel } from 'antd';
import { Steps } from 'antd';
import { Result, Button, Divider } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import { Collapse } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const { Step } = Steps;

export default class AsNavFor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nav1: null,
			nav2: null
		};
	}

	componentDidMount() {
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2,
			activeSlide: 0,
			activeSlide2: 0
		});
	}

	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 1000,
			// adaptiveHeight: true,
			slidesToShow: 1,
			centerMode: true,
			centerPadding: '10px',
			slidesToScroll: 1,
			swipeToSlide: true,
			beforeChange: (current, next) => this.setState({ activeSlide: next }),
			afterChange: (current) => this.setState({ activeSlide2: current })
		};

		return (
			<div className="slider_container">
				<h2>Slider Syncing (AsNavFor)</h2>
				<p>
					BeforeChange => activeSlide: <strong>{this.state.activeSlide}</strong>
				</p>
				<p>
					AfterChange => activeSlide: <strong>{this.state.activeSlide2}</strong>
				</p>
				<h4>First Slider</h4>
				<Carousel asNavFor={this.state.nav2} ref={(slider) => (this.slider1 = slider)} {...settings}>
					<div>
						<Steps current={1}>
							<Step title="Finished" description="This is a description." />
							<Step title="In Progress" description="This is a description." />
							<Step title="Waiting" description="This is a description." />
						</Steps>
					</div>
					<div>
						<img src="https://smartslider3.com/wp-content/uploads/slider51/dynamic1.jpeg" />
						<p className="flex-caption">Adventurer Cheesecake Brownie</p>
					</div>
					<div>
						<Progress percent={30} />
						<Progress percent={50} status="active" />
						<Progress percent={70} status="exception" />
						<Progress percent={100} />
						<Progress percent={50} showInfo={false} />
					</div>
					<div>
						<img src="https://smartslider3.com/wp-content/uploads/slider51/dynamic3.jpeg" />
						<p className="flex-caption">Adventurer Cheesecake Brownie</p>
					</div>
					<div>
						<img src="https://smartslider3.com/wp-content/uploads/slider51/dynamic4.jpeg" />
						<p className="flex-caption">Adventurer Cheesecake Brownie</p>
					</div>
					<div>
						<Result
							icon={<SmileOutlined />}
							title="Great, we have done all the operations!"
							extra={<Button type="primary">Next</Button>}
						/>
					</div>
				</Carousel>
				<Divider plain>Text</Divider>
				<Collapse
					accordion
					onChange={(key) => {
						console.log('object', key);
						this.setState({
							nav1: this.key,
							nav2: this.key
						});
					}}
				>
					<Panel header="This is panel header 1" key="1">
						<p>{text}</p>
					</Panel>
					<Panel header="This is panel header 2" key="2">
						<p>{text}</p>
					</Panel>
					<Panel header="This is panel header 3" key="3">
						<p>{text}</p>
					</Panel>
				</Collapse>
				<Divider plain>Text</Divider>
				<h4>Second Slider</h4>
				<Carousel
					asNavFor={this.state.nav1}
					ref={(slider) => (this.slider2 = slider)}
					slidesToShow={3}
					swipeToSlide={true}
					focusOnSelect={true}
					vertical
					{...settings}
				>
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
					<div>
						<h3>5</h3>
					</div>
					<div>
						<h3>6</h3>
					</div>
				</Carousel>
			</div>
		);
	}
}
