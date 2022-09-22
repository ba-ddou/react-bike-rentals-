import { Button, Group } from '@mantine/core';
import React, { FunctionComponent } from 'react'

interface HeaderAuthCTAsProps {
    
}
 
const HeaderAuthCTAs: FunctionComponent<HeaderAuthCTAsProps> = () => {
    return (
      <Group position="center" pb="xl" px="md">
        <Button variant="default">Log in</Button>
        <Button>Sign up</Button>
      </Group>
    );
}
 
export default HeaderAuthCTAs;