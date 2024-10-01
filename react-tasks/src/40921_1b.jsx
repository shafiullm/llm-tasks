import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

function App() {
  const [consumed, setConsumed] = useState(0);
  const [currentInput, setCurrentInput] = useState(0);
  const [remaining, setRemaining] = useState(3.7);

  useEffect(() => {
    setRemaining(Math.max(3.7 - consumed, 0));
  }, [consumed]);

  const addWater = () => {
    setConsumed((prev) => Math.min(Math.max(prev + currentInput, 0), 3.7));
    setCurrentInput(0);
  };

  const clearWater = () => {
    setConsumed(0);
    setCurrentInput(0);
  };

  const incrementInput = (value) => {
    setCurrentInput((prev) => Math.min(Math.max(prev + value, 0), 3.7));
  };

  const getProgressColor = () => {
    if (consumed > 3.7 || consumed < 1.7) return "red";
    if (consumed >= 1.7 && consumed <= 2.7) return "yellow";
    return "green";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-4 sm:p-6">
        <CardHeader>
          <CardTitle>Water Consumption Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress
            value={Math.min((consumed / 3.7) * 100, 100)}
            className={`h-4 ${getProgressColor()}-progress`}
          />
          <div className="flex justify-between items-center">
            <span className="text-lg">Consumed: {consumed.toFixed(2)}L</span>
            <span className="text-lg">Remaining: {remaining.toFixed(2)}L</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Goal: 2.7 to 3.7 liters
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => incrementInput(-0.25)}>
              -
            </Button>
            <Input
              type="text"
              value={currentInput.toFixed(2)}
              onChange={(e) => setCurrentInput(parseFloat(e.target.value) || 0)}
              className="text-center flex-grow"
            />
            <Button variant="outline" onClick={() => incrementInput(0.25)}>
              +
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={addWater}
              className="bg-red-500 hover:bg-red-600 text-white flex-grow"
            >
              Add
            </Button>
            <Button
              onClick={clearWater}
              className="bg-red-500 hover:bg-red-600 text-white flex-grow"
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
