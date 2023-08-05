import data from "@/constants.json";
import { dateFormat } from "highcharts";

interface MessageObject {
	date: string;
	time: string;
	count: number;
}

interface SeriesDataType {
	channelId: string;
	messages: MessageObject[];
}

export default class EngagementHelper {
	static getChannelIDsWithMessageMoreThanOneDay = () => {
		let hashMap: Map<string, MessageObject[]> = new Map();

		for (let messageCount of data.messageCountList) {
			const messages = {
				date: messageCount.timeBucket.split("T")[0],
				time: messageCount.timeBucket.split("T")[1],
				count: parseInt(messageCount.count),
			};
			if (hashMap.has(messageCount.channelId)) {
				hashMap.set(messageCount.channelId, [
					...hashMap.get(messageCount.channelId)!,
					messages,
				]);
			} else {
				hashMap.set(messageCount.channelId, [messages]);
			}
		}

		let channelIDList = new Array<SeriesDataType>();

		hashMap.forEach((value, key) => {
			if (value.length > 1) {
				const set = new Set();
				value.forEach((x) => {
					set.add(x.date);
				});

				if (set.size > 1) {
					channelIDList.push({
						channelId: key,
						messages: value,
					});
				}
			}
		});
		return channelIDList;
	};

	static generateSeriesData = (channelIDList: SeriesDataType[]) => {
		const series = new Array();

		channelIDList.forEach((value) => {
			const messageCounts = new Array();
			value.messages.forEach((value) => {
				const d = new Date(value.date);
				messageCounts.push([
					Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()),
					value.count,
				]);
			});
			const channeName = data.channels.filter(
				(item) => item.id === String(value.channelId)
			)[0];

			series.push({
				type: "spline",
				name: channeName !== undefined ? channeName.name : "series",
				data: messageCounts,
			});
		});

		return series;
	};

	static engagementMessageOverTimeChartOptions = () => {
		const channelIDList = this.getChannelIDsWithMessageMoreThanOneDay();
		const series = this.generateSeriesData(channelIDList);
		const bgColor = "#22222C";
		const lineColor = "rgba(255,255,255,0.4)";

		const options: Highcharts.Options = {
			title: {
				text: "",
			},
			xAxis: {
				type: "datetime",
				lineColor: lineColor,
				tickColor: lineColor,
				tickInterval: 24 * 60 * 60 * 1000,
				crosshair: {
					width: 1,
					color: lineColor,
				},
				labels: {
					style: { color: lineColor },
				},
			},
			yAxis: {
				title: {
					text: "",
				},
				lineColor: lineColor,
				tickWidth: 1,
				tickColor: lineColor,
				labels: {
					style: { color: lineColor },
				},
				gridLineColor: "transparent",
			},
			chart: {
				backgroundColor: bgColor,
				alignTicks: true,
			},
			exporting: {
				enabled: false,
			},
			legend: {
				backgroundColor: "#15161B",
				itemStyle: { color: "white" },
			},
			tooltip: {
				backgroundColor: "rgba(0,0,0,0.5)",
				borderColor: "#055C5C",
				borderRadius: 3,
				borderWidth: 1,
				style: { color: "white" },
				formatter: function () {
					if (this.x !== undefined && typeof this.x === "number") {
						return (
							"<b>" +
							this.series.name +
							"</b><br/>" +
							this.y +
							" messages on " +
							dateFormat("%e %b", this.x!)
						);
					} else {
						return (
							"<b>" +
							this.series.name +
							"</b><br/>" +
							this.y +
							" messages"
						);
					}
				},
			},
			series: series,
		};
		return options;
	};
}
