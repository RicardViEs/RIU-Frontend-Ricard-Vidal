import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';
import { FormControl, NgControl } from '@angular/forms';

@Component({
    template: '<input [appUppercase]/>',  
    imports: [UppercaseDirective]
})
class TestComponent {}

describe('EditHeroFormComponent (uppercaseDirective)', () => {

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement; 

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [UppercaseDirective, TestComponent],
            providers: [{ provide: NgControl, useValue: new FormControl() }],
        }).createComponent(TestComponent);
        
        fixture.detectChanges();
        
        des = fixture.debugElement.query(By.directive(UppercaseDirective));
    });

    it('text should be upper case', () => {
        const input = des.nativeElement as HTMLInputElement;
        input.value = 'v';
        
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(input.value).toBe('V');
    });

});