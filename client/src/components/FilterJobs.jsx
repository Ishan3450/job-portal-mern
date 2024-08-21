import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filters = [
  {
    type: "Location",
    values: [
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Ahmedabad",
    ],
  },
  {
    type: "Industry",
    values: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    type: "Salary",
    values: ["0-40k", "40k-1L", ">1L"],
  },
];

const FilterJobs = () => {
  return (
    <div>
      <div className="font-semibold">FilterJobs</div>
      <hr className="mt-3" />
      <div className="mt-3">
        <RadioGroup>
          {filters.map((filter, index) => {
            return (
              <div key={index}>
                <h1 className=" font-semibold">{filter.type}</h1>
                <div className="flex flex-col gap-2 mt-3">
                  {filter.values.map((item, index) => {
                    return (
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={item} />
                        <Label>{item}</Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterJobs;
