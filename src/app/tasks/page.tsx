"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { taskProps } from "@/types";
import { Progress } from "@/components/ui/progress";
import {
	faChevronDown,
	faChevronUp,
	faGripLines,
	faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskTable from "@/components/TaskTable";

const Tasks = () => {
	const { tasks } = useAuthContext();
	const [progress, setProgress] = useState(0);

	const determineNumTasksCompleted = (): number => {
		return tasks.filter((task: taskProps) => task.status === 2).length;
	};
	const determineNumLowPriority = (): number => {
		return tasks.filter((task: taskProps) => task.priority === "Low").length;
	};
	const determineNumMedPriority = (): number => {
		return tasks.filter((task: taskProps) => task.priority === "Medium").length;
	};
	const determineNumHighPriority = (): number => {
		return tasks.filter((task: taskProps) => task.priority === "High").length;
	};

	useEffect(() => {
		const numCompleted = determineNumTasksCompleted();
		const totalTasks = tasks.length;
		const newProgress = totalTasks ? (numCompleted / totalTasks) * 100 : 0; // Calculate percentage
		setProgress(newProgress);
	}, [tasks]);

	return (
		<div className="w-full h-full px-6 py-4">
			<h1 className="text-3xl mb-4">Tasks</h1>
			<div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
				<Card className="h-60 w-full shadow-md">
					<CardHeader>
						<CardTitle className="text-sm uppercase">Tasks Completed</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-around">
							<span className="font-semibold">
								{determineNumTasksCompleted()}/{tasks.length}
							</span>
							<Progress value={progress} className="w-[60%] [&>*]:bg-primary" />
							<FontAwesomeIcon icon={faListCheck} className="text-gray-400" />
						</div>
					</CardContent>
				</Card>

				<Card className="h-60 w-full shadow-md">
					<CardHeader>
						<CardTitle className="text-sm uppercase">Task Priorities</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="w-full flex flex-col items-start justify-center gap-2">
							<div className="w-full px-4 py-2 rounded-full flex items-center justify-between text-primary bg-primary/10">
								<div className="flex items-center gap-2">
									<span>Low</span>
									<FontAwesomeIcon icon={faChevronDown} />
								</div>
								<span>{determineNumLowPriority()}</span>
							</div>
							<div className="w-full px-4 py-2 rounded-full flex items-center justify-between text-yellow-400 bg-yellow-400/10">
								<div className="flex items-center gap-2">
									<span>Medium</span>
									<FontAwesomeIcon icon={faGripLines} />
								</div>
								<span>{determineNumMedPriority()}</span>
							</div>
							<div className="w-full px-4 py-2 rounded-full flex items-center justify-between text-red-500 bg-red-500/10">
								<div className="flex items-center gap-2">
									<span>High</span>
									<FontAwesomeIcon icon={faChevronUp} />
								</div>
								<span>{determineNumHighPriority()}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className="w-full">
				<TaskTable tasks={tasks} />
			</div>
		</div>
	);
};

export default Tasks;
