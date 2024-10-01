import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WaterTracker = () => {
  const [remaining, setRemaining] = useState(3.7);
  const [consumed, setConsumed] = useState(0);
  const [tempConsumption, setTempConsumption] = useState(0);

  useEffect(() => {
    const storedConsumed = localStorage.getItem("waterConsumed");
    if (storedConsumed) {
      setConsumed(parseFloat(storedConsumed));
      setRemaining(3.7 - parseFloat(storedConsumed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("waterConsumed", consumed.toString());
  }, [consumed]);

  const handleAdd = () => {
    const newConsumed = consumed + tempConsumption;
    setConsumed(newConsumed);
    setRemaining(3.7 - newConsumed);
    setTempConsumption(0);
  };

  const handleClear = () => {
    setConsumed(0);
    setRemaining(3.7);
    setTempConsumption(0);
    localStorage.removeItem("waterConsumed");
  };

  return (
    <Card className="sm:max-w-sm mx-auto mt-5">
      <CardHeader>
        <CardTitle>Water Tracker</CardTitle>
        <CardDescription>Track your daily water intake</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-4">
          <p className="text-lg">Remaining: {remaining.toFixed(1)} L</p>
          <p className="text-sm text-muted-foreground">Goal: 2.7 L - 3.7 L</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={() =>
              setTempConsumption((prev) => Math.max(0, prev - 0.1))
            }
          >
            -
          </Button>
          <span className="text-xl">{tempConsumption.toFixed(1)} L</span>
          <Button onClick={() => setTempConsumption((prev) => prev + 0.1)}>
            +
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleClear} variant="destructive">
          Clear
        </Button>
      </CardFooter>
      <CardContent>
        <p>Amount Consumed: {consumed.toFixed(1)} L</p>
      </CardContent>
    </Card>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background p-4">
      <WaterTracker />
    </div>
  );
}
