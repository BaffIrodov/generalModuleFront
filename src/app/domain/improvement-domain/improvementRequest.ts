import {ConfigMapAsList} from "./configMapAsList";

export class ImprovementRequest {
  testDatasetPercent: number;
  config: Map<String, Object>;
  configList: ConfigMapAsList[];
}
