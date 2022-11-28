import {ConfigMapAsList} from "./configMapAsList";

export class ImprovementRequest {
  testDatasetPercent: number;
  testDatasetCount: number;
  config: Map<String, Object>;
  configList: ConfigMapAsList[];
}
