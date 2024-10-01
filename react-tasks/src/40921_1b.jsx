import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function WaterTracker() {
  const [remaining, setRemaining] = useState(3.7);
  const [consumed, setConsumed] = useState(0);
  const [currentInput, setCurrentInput] = useState("0");

  const maxLiters = 3.7;
  const minLiters = 2.7;

  const handleAddWater = () => {
    const amount = parseFloat(currentInput);
    if (!isNaN(amount)) {
      let newConsumed = consumed + amount;
      let newRemaining = Math.max(minLiters, remaining - amount);
      if (newConsumed > maxLiters) {
        newConsumed = maxLiters;
        newRemaining = minLiters;
      }
      setConsumed(newConsumed);
      setRemaining(newRemaining);
      setCurrentInput("0");
    }
  };

  const handleClear = () => {
    setRemaining(3.7);
    setConsumed(0);
    setCurrentInput("0");
  };

  const changeInput = (change) => {
    let newValue = parseFloat(currentInput) + change;
    newValue = Math.max(0, Math.min(newValue, maxLiters - consumed));
    setCurrentInput(newValue.toFixed(1));
  };

  return (
    <Card className="max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle>Water Intake Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-center">
          <p>Remaining: {remaining.toFixed(1)} L</p>
          <p>Consumed: {consumed.toFixed(1)} L</p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <Button onClick={() => changeInput(-0.1)}>-</Button>
          <Input
            type="number"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="text-center w-20"
          />
          <Button onClick={() => changeInput(0.1)}>+</Button>
        </div>
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleAddWater}>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <WaterTracker />
    </div>
  );
}
