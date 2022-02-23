export interface DatasetData {
    limit?: any;
    transform?: any;
    column_index?: any;
    column_names: string[];
    start_date: string;
    end_date: string;
    frequency: string;
    data: any[];
    collapse?: any;
    order?: any;
}

export interface Dataset {
    dataset_data: DatasetData;
}

export interface ChartData {
    date: string;
    open: number;
    close: number
    high: number;
    low: number;
}
