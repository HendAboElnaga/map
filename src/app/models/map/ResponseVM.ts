

export enum HttpStatusCodeEnum {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}



export class ResponseVm<T> {
  StatusCode!: HttpStatusCodeEnum;
  Messages!: string[];
  Data!: T;
  DataCount!: number;
  LongDataCount!: number;
  dashboard!: any
}


export class elements{
    region!:string;
    district!:string;
    olt_name!:string;
    exchange!:string;
    fdt_clli!:string;
    hay_clli!:string;
    customer_osb_or_tb_clli!:string;
    total_customer!:number;
    degraded_signal!:number;
    loss_signal!:number;
    up!:number;

}

export class filter{
    region!:string;
    district!:string;
    olt_name!:string;
    exchange!:string;
    hay_clli!:string;
    PageSize:number=10;
    PageIndex:number=1;
    type!:string;
    status!:string;
}


export class elementAnalysisVM
{
    cst!:string;
    degraded!:string;
    fdt!:string;
    district!:string;
    down!:string;
    exchange!:string;
    faults!:string;
    future_rehab!:string;
    hay!:string;
    index_key!:string;
    index_value!:number;
    mso!:string;
    olt!:string;
    power_index?:number;
    region!:string;
    rehabbed!:string;
    service_index?:number;
    tb!:string;
    total!:number;
    up_stable!:string;
    up_unstable!:string;
}


export class fdtanalysis
{
    region!:string;
    district!:string;
    hay!:string;
    tb_count!:number;
    total!:number;
    fdt!:string;
    up_stable!:number;
    down!:number;
    degraded!:number;
    up_unstable!:number;
    cst!:number;
    mso!:number;
    faults!:number;
    fault_rate!:number;
    mso_rate!:number;
    power_index!:number;
    service_index!:number;
}

export class fdt_power_index_avg_mv
{
    region!:string;
    avg_pi!:number;
}

export class top_district
{
    district!:string;
    total!:number;
    tp_pi!:number;
    fdt_pi!:number;
}

export class top_district_data
{
    district!:string;
    total!:number;
    tp_pi!:number;
    fdt_pi!:number;
    down!:number;
    degraded!:number;
    up_unstable!:number;
    up_stable!:number;
    down_percent!:number;
    degraded_percent!:number;
    up_unstable_percent!:number;
    up_stable_percent!:number;
}



export class tbanalysis
{
    region!:string;
    district!:string;
    hay!:string;
    tb!:string;
    total!:number;
    fdt!:string;
    up_stable!:number;
    down!:number;
    degraded!:number;
    up_unstable!:number;
    cst!:number;
    mso!:number;
    faults!:number;
    power_index!:number;
}


export class daily_alarms
{
    occure!:Date;
    no_signal!:number;
    no_signal_live!:number;
    loss_count!:number;
    loss_count_live!:number;
}

export class top_worst_fdt
{
    fdt!:string;
    service_index!:number;
}

export class TopWorstFDTPowerIndexVm
{
    fdt!:string;
    power_index!:number;
}

export class top_worst_power_index_fdt
{
    fdt!:string;
    service_index!:number;
}


export class Serieslist {
    data: number[] = [];
    label!: string;
    labelID!: number;
    stack!: string;
    lineThickness!: number;
    fill!: boolean;
  }


export class DashboardCharts {
    //* my adds
    orderId?: number;
    errorMessage?: string;
    //* the old structure
    ChartName?: string;
    ChartType?: string;
    // Data?!: KeyValueChart[] = [];
    //chartsDatalist!: ChartsDatalist = new ChartsDatalist();
    ChartLabels?: string[] = [];
    chartdata?: number[] = [];
    chartSeriesdata?: Serieslist[] = [];
  }


  export class hay_vm
  {
    hay_value!:string;
  }

  export class olt_vm
  {
    olt_value!:string;
  }

  export class fdtIndexes
{
    row_version!:Date;
    live_alarm_index!:number;
    live_service_index!:number;
    historical_alarm_index!:number;
    historical_service_index!:number;
}

export class fdt_location
{
    fdt!:string;
    power_index!:number;
    longitude!:string;
    latitude!:string;
}