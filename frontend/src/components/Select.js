import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Grid from "@mui/material/Grid";

export default function SelectFormSubmission() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const selectedPet = formJson.challenge;
    navigate(`/${selectedPet}`);
  };

  return (
    <div className="dropdown">
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Select
              placeholder="Select your favourite Challenge"
              name="challenge"
              required
              defaultValue="verbs"
              sx={{ minWidth: 500 }}
            >
              <Option value="verbs">Verbs</Option>
              <Option value="grammer">Grammer</Option>
              <Option value="nouns">Nouns</Option>
              <Option value="prepositions">Prepositions</Option>
            </Select>
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
