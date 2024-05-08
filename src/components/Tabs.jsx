import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react';

import GraphArea from './GraphArea';

function Tabs() {
  return (
    <Card>
      <TabGroup>
        <TabList variant="solid" className="mt-4">
          <Tab>Peso / Grasa / Masa Muscular</Tab>
          <Tab>Agua Corporal / Masa Osea</Tab>
          <Tab>IMC</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GraphArea />
          </TabPanel>
          <TabPanel>
            <GraphArea />
          </TabPanel>
          <TabPanel>
            <GraphArea />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
}

export default Tabs;