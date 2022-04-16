import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        this._selectedType = {};
        this._selectedBrand = {};
        this._currentPage = 1;
        this._pageLimitRecord = 5;
        this._pageTotalRecord = 5;

        makeAutoObservable(this)
    };

    setTypes(types) {
        this._types = types;
    };

    setBrands(brands) {
        this._brands = brands;
    };

    setDevices(devices) {
        this._devices = devices;
    };

    setSelectedType(selectedType) {
        this._selectedType = selectedType;
        this.setCurrentPage(1);
    };

    setSelectedBrand(selectedBrand) {
        this._selectedBrand = selectedBrand;
        this.setCurrentPage(1);
    };

    setCurrentPage(page) {
        this._currentPage = page;
    };

    setPageLimitRecord(limit) {
        this._pageLimitRecord = limit;
    };

    setPageTotalRecord(total) {
        this._pageTotalRecord = total;
    };

    get types() {
        return this._types;
    };

    get brands() {
        return this._brands;
    };

    get devices() {
        return this._devices;
    };

    get selectedType() {
        return this._selectedType;
    };

    get selectedBrand() {
        return this._selectedBrand;
    };

    get currentPage() {
        return this._currentPage;
    };

    get pageLimitRecord() {
        return this._pageLimitRecord;
    };

    get pageTotalRecord() {
        return this._pageTotalRecord;
    };
};
