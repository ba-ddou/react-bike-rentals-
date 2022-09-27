import React, { FunctionComponent } from "react";
import { Accordion, Text, useMantineTheme } from "@mantine/core";
import {
  CheckboxGroup,
  ColorSwatchSelectionGroup,
  MultiSelectWithSearch,
} from "@components/moleculs";
import { colors } from "@root/config/colors";
import { useBikes } from "@root/providers/BikeProvider";

interface FiltersPanelProps {}

const FiltersPanel: FunctionComponent<FiltersPanelProps> = () => {
  const { models, colors, locations, applyFilters } = useBikes();
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
              options={models.map(
                (model) => ({ label: model, id: model } as const)
              )}
              onChange={(selected) => {
                applyFilters({
                  model: selected,
                });
              }}
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
              initialColors={colors}
              onChange={(colors) => {
                applyFilters({
                  color: colors,
                });
              }}
            />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="Location">
          <Accordion.Control>
            <Text size="sm">Location</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <MultiSelectWithSearch
              options={locations.map((city) => ({ label: city, value: city }))}
              onChange={(selected) => {
                applyFilters({
                  location: selected,
                });
              }}
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
