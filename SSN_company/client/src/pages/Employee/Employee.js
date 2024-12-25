import { Search, ButtonSetting, ButtonSort, EmployeeCard, PagginationCard, HeaderPageLine, Loading } from '../../utils/components';
import { getEmployees, getReportEmployees } from "../../store/slices/employeeSlice";
import {setCurrentFilter, setCurrentSort} from "../../store/slices/settingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Employee.scss";

const filter = ["Hire date", "Name", "Direction"];
const sort = ["A - Z", "Z - A"];

const Employee = () => {
    const dispatch = useDispatch();

    const { employees, isLoading } = useSelector((state) => state.employee);
    const {currentSort, currentFilter} = useSelector((state) => state.setting);

    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const sortedEmployees = currentSort === 1 ?? currentFilter === 1 ? [...employees].reverse() : employees;

    const sortChange = (index) => {
        setLoading(true); 
        dispatch(setCurrentSort(index));

        const timer = setTimeout(() => {
            setLoading(false); 
        }, 500); 
    
        return () => clearTimeout(timer);
    };

    const buttonClick = (index) => {
        dispatch(setCurrentFilter(index)); 
        setLoading(true);
    };

    const downloadReport = async () => {
        const resultAction = await dispatch(getReportEmployees({ users: sortedEmployees }));

    };

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getEmployees(filter[currentFilter].toLowerCase()));
            setLoading(false);
        }, 500); 

        return () => clearTimeout(timer); 
    }, [dispatch, currentFilter]);

    const filteredEmployees = () => {
        return sortedEmployees.filter(employee =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            employee.surname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <>
            <div className="header_employee">
                <p className="text_mln_f52_l52">Employee</p>
                <Search text={"Search employee..."} customClass={"employee"} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <HeaderPageLine />
                <div className="container_setting">
                    <div className="container_filter">
                        <p className="text_mln_f30_l30">Filter by</p>
                        <div className="container_filter_button">
                            {filter &&
                                filter.map((setting, index) => {
                                    return (
                                        <ButtonSetting key={index} text={setting} index={index} isActive={currentFilter === index} onClick={() => buttonClick(index)} />
                                    );
                                })}
                        </div>
                    </div>
                    <div className="container_report">
                        <ButtonSetting text={"downoload"} index={1} onClick={downloadReport}/>
                        <p className="text_mln_f18_l18">list of employees</p>
                    </div>
                    <div className="container_sort">
                        <p className="text_mln_f30_l30">Sort by</p>
                        <div className="container_sort_button">
                            {sort &&
                                sort.map((setting, index) => {
                                    return (
                                        <ButtonSort key={setting} text={setting} isActive={currentSort === index} onClick={() => sortChange(index)} />
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <HeaderPageLine />
            </div>
            {loading || isLoading ? (
                <Loading />
            ) : (
                <>
                    <PagginationCard arrayCards={filteredEmployees()} cardType="employee" />
                </>
            )}
        </>
    );
};

export default Employee;
