import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function App() {
  const [consumed, setConsumed] = useState(0);
  const [currentInput, setCurrentInput] = useState(0.25);
  const totalGoal = 3.7;
  const minGoal = 2.7;

  const handleIncrement = () => {
    setCurrentInput((prev) => Math.min(prev + 0.25, totalGoal));
  };

  const handleDecrement = () => {
    setCurrentInput((prev) => Math.max(prev - 0.25, 0));
  };

  const addConsumption = () => {
    setConsumed((prev) => Math.min(prev + currentInput, totalGoal));
    setCurrentInput(0.25);
  };

  const clearConsumption = () => {
    setConsumed(0);
    setCurrentInput(0.25);
  };

  const remaining = Math.max(totalGoal - consumed, 0);
  const progressPercentage = (consumed / totalGoal) * 100;
  let progressColor = "bg-blue-500";
  if (consumed > 3.7 || consumed < 1.7) progressColor = "bg-red-500";
  else if (consumed >= 1.7 && consumed < 2.7) progressColor = "bg-yellow-500";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-4 sm:p-6">
        <CardHeader>
          <h2 className="text-2xl font-bold">Water Consumption Tracker</h2>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="h-4 rounded-full overflow-hidden">
              <div
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: progressColor,
                }}
                className="h-full"
              ></div>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <span>Consumed: {consumed.toFixed(2)} L</span>
            <span>Remaining: {remaining.toFixed(2)} L</span>
          </div>
          <p className="text-sm text-center text-gray-500">
            Goal: 3.7 to 2.7 liters
          </p>
          <div className="mt-4 flex items-center">
            <Button variant="outline" onClick={handleDecrement}>
              -
            </Button>
            <Input
              type="number"
              value={currentInput}
              onChange={(e) => setCurrentInput(parseFloat(e.target.value) || 0)}
              className="text-center mx-2 flex-grow"
              step="0.25"
            />
            <Button variant="outline" onClick={handleIncrement}>
              +
            </Button>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button onClick={addConsumption} className="flex-grow">
              Add
            </Button>
            <Button
              onClick={clearConsumption}
              className="flex-grow bg-red-500 hover:bg-red-600"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
