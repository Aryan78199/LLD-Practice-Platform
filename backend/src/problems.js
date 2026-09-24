export const problems = [
  {
    id: "parking-lot",
    title: "Parking Lot",
    difficulty: "Medium",
    description:
      "Design a parking lot that supports multiple floors, different vehicle types and appropriate parking spot allocation.",
    requirements: [
      "A parking lot can have multiple floors.",
      "Each floor contains multiple parking spots.",
      "Different vehicle types can use compatible spots.",
      "A vehicle should be assigned an appropriate available spot.",
      "When a vehicle exits, the spot becomes available again.",
      "The allocation policy should be replaceable without changing the core parking service."
    ],
    hints: [
      "Think about Vehicle, ParkingSpot, ParkingFloor and ParkingLot.",
      "Consider an interface for allocation strategy.",
      "Keep responsibilities separated."
    ],
    expectedSignals: ["interface", "class", "strategy", "responsibility"]
  },
  {
    id: "vending-machine",
    title: "Vending Machine",
    difficulty: "Medium",
    description:
      "Design a vending machine that supports product selection, payment, dispensing and change.",
    requirements: [
      "The machine stores products and prices.",
      "A user can select an available product.",
      "The machine accepts payment.",
      "The machine dispenses the product after sufficient payment.",
      "The machine returns change when appropriate.",
      "Invalid selections and insufficient payment should be handled safely."
    ],
    hints: [
      "Model explicit machine states.",
      "Separate inventory, payment and dispensing responsibilities.",
      "Consider a State pattern."
    ],
    expectedSignals: ["state", "class", "interface", "responsibility"]
  },
  {
    id: "elevator",
    title: "Elevator System",
    difficulty: "Medium",
    description:
      "Design an elevator system that accepts floor requests and decides which elevator should handle a request.",
    requirements: [
      "The system can contain multiple elevators.",
      "Users can request an elevator from a floor.",
      "An elevator can move between floors.",
      "The system should choose an appropriate elevator.",
      "Scheduling logic should be replaceable.",
      "The design should remain easy to extend."
    ],
    hints: [
      "Separate elevator state from request scheduling.",
      "Consider a scheduling strategy interface.",
      "Avoid putting all behaviour in one manager class."
    ],
    expectedSignals: ["interface", "strategy", "class", "responsibility"]
  }
];
