import React, { FunctionComponent } from 'react';
import { Accordion, Text } from "@mantine/core";


interface FiltersPanelProps {
    
}
 
const FiltersPanel: FunctionComponent<FiltersPanelProps> = () => {
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
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Color">
            <Accordion.Control>
              <Text size="sm">Color</Text>
            </Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Location">
            <Accordion.Control>
              <Text size="sm">Location</Text>
            </Accordion.Control>
            <Accordion.Panel></Accordion.Panel>
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
}
 
export default FiltersPanel;