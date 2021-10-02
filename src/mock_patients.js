let patients=
[
        {
            bed:1,
            hosp_number:11111111,
            patient_name:"Mary Test",
            on_iv_fluids:true,
            iv_status:"prescribed",
            bags:
                [
                   {
                        bag_id:1,
                        fluid:"0.9% Saline",
                        volume:1000,
                        rate:125,
                        bag_running:true,
                        time_started:null,
                    },
                    {
                        bag_id:2,
                        fluid:"5% Dextrose",
                        volume:1000,
                        rate:83,
                        bag_running:true,
                        time_started:null,
                    }
                ]
        },
        {
            bed:2,
            hosp_number:2222222,
            patient_name:"Henry Test",
            on_iv_fluids:true,
            iv_status:"prescribed",
            bags:
                [
                   {
                        bag_id:3,
                        fluid:"Plasmalyte",
                        volume:1000,
                        rate:100,
                        bag_running:true,
                        time_started:null,
                    },
                    {
                        bag_id:4,
                        fluid:"0.9% saline 40mmol KCl",
                        volume:1000,
                        rate:100,
                        bag_running:true,
                        time_started:null,
                    },
                    {
                        bag_id:5,
                        fluid:"5% dextrose 40mmol KCl",
                        volume:1000,
                        rate:100,
                        bag_running:true,
                        time_started:null,
                    }
                ]
        },
        {
            bed:3,
            hosp_number:333333,
            patient_name:"Fred Test",
            on_iv_fluids:false,
            iv_status:"not_prescribed",
            bags:
                [
                  
                ]
        },













]



















export default patients