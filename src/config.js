import Amazon from "./ImportProfile/Amazon";
import Discover from "./ImportProfile/Discover";
import Ideal from "./ImportProfile/Ideal";
import ManualEntries from "./ImportProfile/ManualEntries";

const config = {
  budgetCategories: [
    "Food",
    "Gas",
    "Car",
    "Misc. Household",
    "Kenz Fun Money",
    "Sam Fun Money",
    "Cat",
    "Home Improvement",
    "Baby",
    "Mandolin",
    "Spotify Premium",
    "Student Loans",
    "Donations",
    "Dropbox",
    "Utilites + Trash",
    "Internet",
    "Amazon Prime",
    "Home Insurance",
    "Geico",
    "Mortgage",
    "Income",
    "Manual Review",
    "Ignore",
  ],

  importProfiles: [Amazon, Discover, Ideal, ManualEntries],
};

export const { budgetCategories, importProfiles } = config;

export default config;
