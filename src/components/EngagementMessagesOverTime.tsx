import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import EngagementHelper from "./EngagementHelper";

const EngagementMessagesOverTime = () => {
	const options = EngagementHelper.engagementMessageOverTimeChartOptions();

	if (typeof Highcharts === "object") {
		HighchartsExporting(Highcharts);
	}

	return (
		<div className="w-11/12">
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default EngagementMessagesOverTime;
