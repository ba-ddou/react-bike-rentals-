import React, { FunctionComponent } from "react";
import { Accordion, Text, useMantineTheme } from "@mantine/core";
import {
  CheckboxGroup,
  ColorSwatchSelectionGroup,
  MultiSelectWithSearch,
} from "@components/moleculs";

interface FiltersPanelProps {}

const FiltersPanel: FunctionComponent<FiltersPanelProps> = () => {
  const theme = useMantineTheme();
  const colors = Object.keys(theme.colors);
  const cities = ["New York", "London", "Paris", "Berlin", "Madrid"];
  return (
    <div>
      <Text
        size="lg"
        weight="bolder"
        style={{
          padding: "1rem",
        }}
      >
        Filters
      </Text>
      <Accordion radius="md" defaultValue="Model">
        <Accordion.Item value="Model">
          <Accordion.Control>
            <Text size="sm">Model</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <CheckboxGroup
              options={[
                {
                  id: "Model 1",
                  label: "Model 1",
                },
                {
                  id: "Model 2",
                  label: "Model 2",
                },
              ]}
            />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Color">
          <Accordion.Control>
            <Text size="sm">Color</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <ColorSwatchSelectionGroup
              colors={colors}
              onChange={(colors) => {}}
            />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Location">
          <Accordion.Control>
            <Text size="sm">Location</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <MultiSelectWithSearch
              options={cities.map((city) => ({ label: city, value: city }))}
            />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Rating">
          <Accordion.Control>
            <Text size="sm">Rating</Text>
          </Accordion.Control>
          <Accordion.Panel></Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FiltersPanel;
